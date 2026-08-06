const express = require("express");
const userModel = require("../Authentication/authModels");
const organizationModel = require("../Organization/orgModels.js")
const invitationModel = require("./invitationModel.js");
const crypto = require("node:crypto")
const activityLogger = require("../../utils/activityLog.js")
const createNotification = require("../../services/notificationService.js")

const createInvitationController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== "string") {
      return res.status(400).json({
        message: "Write Email of Member You Want to Invite",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailTest = /^\S+@\S+\.\S+$/;
    if (!emailTest.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Enter The Valid Email",
      });
    }

    const user = await userModel.findOne({ email: normalizedEmail });
    const org = req.organization;

    if (user) {
      const isMember = org.members.some((member) => {
        return member.toString() === user._id.toString();
      });
      if (isMember) {
        return res.status(409).json({
          message: "User is already member of Organization",
        });
      }
    }
    const isInvited = await invitationModel.findOne({
      organization: org._id,
      receiver: normalizedEmail,
      status: "pending",
    });
    if (isInvited) {
      return res.status(409).json({
        message: "User is Already Invited",
      });
    }

    const secretToken = crypto.randomBytes(32).toString("hex")

    const expiryDate = new Date(Date.now() + 7*24*60*60*1000)

    const invite = await invitationModel.create({
        sender:req.user._id,
        organization:org._id,
        receiver:normalizedEmail,
        token:secretToken,
        expiry:expiryDate
    })

    await activityLogger({
      actor:req.user._id,
      organization:req.organization._id,
      entityType:"Invitation",
      entity:invite._id,
      action:"INVITE_SENT",
      message:"Invitaion Sent Successfully"
    })

    if(user){
      await createNotification({
        receiver:user._id,
        sender:req.user._id,
        action:"INVITE_RECEIVED",
        message:`${req.user.name} invited you to ${org.name}`,
        organization:req.organization._id
      })
    }

    res.status(201).json({
        message:"Invitation Successfully Send",
        invitation:invite
    })
  } catch (error) {
    res.status(500).json({
        message:error.message
    })
  }
};

const acceptInvitationController = async(req,res)=>{
    try{
        const token = req.params.token
        if(!token){
            return res.status(400).json({
                message:"Token Not Found"
            })
        }
        const invite = await invitationModel.findOne({token:token})
        if(!invite){
            return res.status(404).json({
                message:"Invitation Not Found"
            })
        }

        if(req.user.email !== invite.receiver){
            return res.status(403).json({
                message:"You are Not Invited in this Organization"
            })
        }

        if(invite.status !== "pending"){
            return res.status(409).json({
                message:"You already Responsed"
            })
        }

        if(invite.expiry < Date.now()){
            return res.status(410).json({
                message:"Invitation Already Expire"
            })
        }

        const org = await organizationModel.findById(invite.organization)
        if(!org){
            return res.status(404).json({
                message:"Organization Not Found"
            })
        }

        org.members.push(req.user._id)
        await org.save()

        invite.status = "accepted"
        await invite.save()

        await activityLogger({
          actor:req.user._id,
          organization:org._id,
          entityType:"Invitation",
          entity:invite._id,
          action:"INVITE_ACCEPTED",
          message:`${req.user.name} has accepted the invitation`,
        })

        await createNotification({
          receiver:invite.sender,
          sender:req.user._id,
          action:"INVITE_ACCEPTED",
          message:`${req.user.name} has accepted your Invitation`,
          organization:invite.organization
        })

        res.status(201).json({
            message:"Invite Accepted",
            organization:org
        })

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const rejectInvitationController = async (req,res)=>{
  try{
    const token = req.params.token
    if(!token){
      return res.status(400).json({
        message:"Token Not Found"
      })
    }

    const invite = await invitationModel.findOne({token:token})
    if(!invite){
      return res.status(404).json({
        message:"Invitataion not Found"
      })
    }

    if(req.user.email !== invite.receiver){
      return res.status(403).json({
        message:"You are not invited"
      })
    }

    if(invite.status !== "pending"){
      return res.status(409).json({
        message:"You already Responsed"
      })
    }

    if(invite.expiry < Date.now()){
      return res.status(410).json({
        message:"Request Already Expired"
      })
    }

    invite.status = "rejected"
    await invite.save()

    await activityLogger({
          actor:req.user._id,
          organization:invite.organization,
          entityType:"Invitation",
          entity:invite._id,
          action:"INVITE_REJECTED",
          message:`${req.user.name} has rejected the invitation`,
        })

    await createNotification({
          receiver:invite.sender,
          sender:req.user._id,
          action:"INVITE_REJECTED",
          message:`${req.user.name} has rejected your Invitation`,
          organization:invite.organization
        })

    res.status(200).json({
      message:"You Rejected The Invite"
    })
  }
  catch(error){
    res.status(500).json({
      message:error.message
    })
  }
}

const cancelInvitationController = async (req,res)=>{
  try{
    const inviteId = req.params.inviteId
    if(!inviteId){
      return res.status(400).json({
        message:"Inivitaion Id not found"
      })
    }

    const invite = await invitationModel.findById(inviteId)
    if(!invite){
      return res.status(404).json({
        message:"Invitation Not Found"
      })
    }

    const user = await userModel.findOne({email:invite.receiver})

    const org = await organizationModel.findById(invite.organization)
    if(!org){
      return res.status(404).json({
        message:"Organization Not Found"
      })
    }

    if(req.user._id.toString() !== org.owner.toString()){
      return res.status(403).json({
        message:"You are not the owner of Organization"
      })
    }

    if(invite.status !== "pending"){
      return res.status(409).json({
        message:"Already Responsed"
      })
    }

    invite.status = "cancelled"
    await invite.save()

    await activityLogger({
          actor:req.user._id,
          organization:invite.organization,
          entityType:"Invitation",
          entity:invite._id,
          action:"INVITE_CANCELLED",
          message:`${req.user.name} has cancelled the invitation`,
        })

    if(user){
      await createNotification({
          receiver:user._id,
          sender:invite.sender,
          action:"INVITE_CANCELLED",
          message:`${req.user.name} has cancelled your invitation to ${org.name}`,
          organization:invite.organization
        })
    }

    res.status(200).json({
      message:"You SuccessFully Cancelled the Invitation"
    })

  }
  catch(error){
    res.status(500).json({
      message:error.message
    })
  }
}

const listOrganizationInvitesController = async (req,res)=>{
  try{

    const page = req.query.page
    const limit = req.query.limit

    const invite = await invitationModel.countDocuments({organization:req.organization._id})
    if(invite === 0){
      return res.status(200).json({
        message:"Invitations of this Organizations not found",
        invitations:[]

      })
    }

    let normalizedPage = parseInt(page,10)
    let normalizedLimit = parseInt(limit,10)

    if(!normalizedPage){
      normalizedPage = 1
    }

    if(!normalizedLimit){
      normalizedLimit = 10
    }

    if(normalizedPage<1){
      normalizedPage=1
    }

    if(normalizedLimit<1){
      normalizedLimit = 10
    }

    if(normalizedLimit>50){
      normalizedLimit = 50
    }

    const totalPages = Math.ceil(invite/normalizedLimit)

    if(normalizedPage > totalPages){
      normalizedPage = totalPages
    }

    const skip = (normalizedPage - 1)*normalizedLimit

    const invites = await invitationModel.find({organization:req.organization._id}).sort({createdAt:-1}).skip(skip).limit(normalizedLimit).lean()

    const paginationObject = {
      page:normalizedPage,
      limit:normalizedLimit,
      totalInvites:invite,
      totalPages:totalPages,
      hasNextPage:normalizedPage < totalPages,
      hasPreviousPage:normalizedPage>1
    }

    res.status(200).json({
      message:"Your Invitations Found",
      invitations :invites,
      pagination:paginationObject
    })

  }
  catch(error){
    res.status(500).json({
      message:error.message
    })
  }
}

const listuserInvitesController = async (req,res)=>{
  try{
    const email = req.user.email
    const page = req.query.page
    const limit = req.query.limit


    const totalInvites = await invitationModel.countDocuments({receiver:email,status:"pending"})
    if(!totalInvites){
      return res.status(200).json({
        message:"There is no invitation from any Organization",
        invitations:[]
      })
    }

    let normalizedPage = Number.parseInt(page,10)
    let normalizedLimit = Number.parseInt(limit,10)

    if(!normalizedPage){
      normalizedPage = 1
    }

    if(normalizedPage<1){
      normalizedPage = 1
    }

    if(!normalizedLimit){
      normalizedLimit = 10
    }

    if(normalizedLimit<1){
      normalizedLimit = 10
    }

    if(normalizedLimit>50){
      normalizedLimit = 50
    }

    const totalPages = Math.ceil(totalInvites/normalizedLimit)

    if(normalizedPage>totalPages){
      normalizedPage = totalPages
    }

    const skip = (normalizedPage -1)*normalizedLimit


    const invites = await invitationModel.find({receiver:email,status:"pending"}).populate("organization","name").populate("sender","name email").sort({createdAt:-1}).skip(skip).limit(normalizedLimit).lean()

    const pagination = {
      page:normalizedPage,
      limit:normalizedLimit,
      totalPages:totalPages,
      totalInvites:totalInvites,
      hasNextPage: normalizedPage < totalPages,
      hasPreviousPage : normalizedPage > 1
    }

    res.status(200).json({
      message:"All Invitation From Organization",
      invitations:invites,
      pagination : pagination
    })

  }
  catch(error){
    res.status(500).json({
      message:error.message
    })
  }
}

module.exports = { createInvitationController,acceptInvitationController,rejectInvitationController,cancelInvitationController,listOrganizationInvitesController,listuserInvitesController };
