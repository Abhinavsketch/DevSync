const mongoose = require("mongoose")

const express = require("express")
const teamModel = require("./teamModel.js")
const orgModel = require("../Organization/orgModels.js")
const userModel = require("../Authentication/authModels.js")
const activityLogger = require("../../utils/activityLog.js")

const createController = async (req,res)=>{
    try{
        const orgId = req.params.id
        const {name} = req.body
        if(!orgId){
            return res.status(401).json({
                message:"Invalid Organization"
            })
        }

        const org = await orgModel.findById(orgId)
        if(!org){
            return res.status(401).json({
                message:"Organization not found"
            })
        }

        const team = await teamModel.create({
            name,
            organization:orgId
        })


        org.teams.push(team._id)
        await org.save()

        await activityLogger({
            actor:req.user._id,
            project:null,
            entityType:"Team",
            entity:team._id,
            action:"CREATE_TEAM",
            message:`${req.user.name} created team`,
            oldValue:null,
            newValue:{
                name:team.name
            }
        })

        res.status(200).json({
            message:"Team Created Successfully",
            team,
            org
        })

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const orgTeam = async (req,res)=>{
    try{
        const orgId = req.params.id
        if(!orgId){
            return res.status(400).json({
                message:"Organization not found"
            })
        }

        const team = await teamModel.find({organization:orgId})
        if(team.length === 0 ){
            return res.status(404).json({
                message:"Team not found"
            })
        }

        res.status(200).json({
            message:"Team found in the organization",
            team,
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const addMember = async (req,res)=>{
    try{
        const teamId = req.params.id
        const {email,role} = req.body
        if(!teamId){
            return res.status(400).json({
                message:"Team Id not found"
            })
        }

        const team = await teamModel.findById(teamId)
        if(!team){
            return res.status(400).json({
                message:"Team not found"
            })
        }

        const user = await userModel.findOne({
                email
        })
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        const duplicate = team.members.some(
            member => member.user.toString() === user._id.toString()
        )

        if(duplicate){
            return res.status(409).json({
                message:"User already exits"
            })
        }

        const oldMember = [...team.members]

        team.members.push({user:user._id,
            role
        })
        await team.save()

        await activityLogger({
            actor:req.user._id,
            project:null,
            entityType:"Team",
            entity:team._id,
            action:"ADD_MEMBER",
            message:`${req.user.name} added member to team`,
            oldValue:oldMember,
            newValue:team.members
        })
        
        res.status(200).json({
            message:"Member Added"
        })



    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const teamMember = async (req,res)=>{
    try{
        const teamId = req.params.id
        if(!teamId){
            return res.status(404).json({
                message:"Team not found"
            })
        }

        const team = await teamModel.findById(teamId).populate("members.user")
        if(!team){
            return res.status(404).json({
                message:"Team not found"
            })
        }

        res.status(200).json({
            message:"User Found",
            members:team.members
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const removemember = async (req,res)=>{
    try{
        const teamId = req.params.teamid
        if(!teamId){
            return res.status(404).json({
                message:"Team ID not fouund"
            })
        }

        const userId = req.params.userid
        if(!userId){
            return res.status(404).json({
                message:"User ID not found"
            })
        }

        const team = await teamModel.findById(teamId)
        if(!team){
            return res.status(404).json({
                message:"Team not found"
            })
        }

        const userPresent = team.members.some(
            member => member.user.toString() === userId
        )
        if(!userPresent){
            return res.status(404).json({
                message:"User not found"
            })
        }
        
        const oldMember = [...team.members]

        team.members = team.members.filter(
            member => member.user.toString() !== userId
        )
        await team.save()

        await activityLogger({
            actor:req.user._id,
            project:null,
            entityType:"Team",
            entity:team._id,
            action:"REMOVE_MEMBER",
            message:`${req.user.name} removed member from ${team.name}`,
            oldValue:oldMember,
            newValue:team.members
        })

        res.status(200).json({
            message:"User deleted suuccessfully",
            members: team.members
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const changeRole = async (req,res)=>{
    try{
        const teamId = req.params.teamid
        if(!teamId){
            return res.status(404).json({
                message:"Team id not found"
            })
        }

        const userId = req.params.userid
        if(!userId){
            return res.status(404).json({
                message:"User id not found"
            })
        }

        const {newRole} = req.body

        const team = await teamModel.findById(teamId)
        if(!team){
            return res.status(404).json({
                message:"Team not fouund"
            })
        }

        const member = team.members.find(
            member => member.user.toString() === userId.toString()
        )
        if(!member){
            return res.status(404).json({
                message:"User not found"
            })
        }

        const oldRole = member.role

        member.role = newRole
        await team.save()

        await activityLogger({
            actor:req.user._id,
            project:null,
            entityType:"Team",
            entity:team._id,
            action:"UPDATE_ROLE",
            message:`${req.user.name} changed roles in ${team.name}`,
            oldValue:{role:oldRole},
            newValue:{role:member.role}
        })
        
        res.status(200).json({
            message:"Role Change Suuccessfully",
            team
        })
    }

    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports={
    createController,
    orgTeam,
    addMember,
    teamMember,
    removemember,
    changeRole
}