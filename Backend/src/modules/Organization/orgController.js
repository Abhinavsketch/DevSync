const express = require("express");
const orgModel = require("./orgModels.js");
const userModel = require("../Authentication/authModels.js");
const { default: mongoose } = require("mongoose");

const escapeFunction = (str)=>{
  return str.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
}

const createController = async (req, res) => {
  try {
    const user = req.user.id;
    const { name, description } = req.body;

    if (!user) {
      return res.status(400).json({
        message: "Invalid User",
      });
    }

    const organization = await orgModel.create({
      name,
      description,
      owner: user,
      members: [user],
    });

    res.status(200).json({
      message: "Organization Successfull Created",
      organization,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getController = async (req, res) => {
  try {
    const user = req.user.id;

    if (!user) {
      return res.status(400).json({
        message: "Invalid User",
      });
    }

    const orgList = await orgModel.find({ members: user });

    res.status(200).json({
      message: "Organization Found",
      orgList,
    });
  } catch (error) {
    res.status(500).json({
      message: "Organization not found",
    });
  }
};

const ownerController = async (req, res) => {
  try {
    const user = req.user.id;
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const ownOrg = await orgModel.find({ owner: user });

    if (ownOrg.length === 0) {
      return res.status(401).json({
        message: "User doesn't have any organization yet",
      });
    }

    res.status(200).json({
      message: "User own Organization",
      ownOrg,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const singleOrganizationController = async (req, res) => {
  try {
    const org = await req.organization.populate("members teams owner");

    res.status(200).json({
      message: "Organization Found",
      org,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addMemberController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const org = req.organization;

    const duplicate = org.members.some(
      (member) => member.toString() === user.id.toString(),
    );
    if (duplicate) {
      return res.status(409).json({
        message: "User Already Exists in this organization",
      });
    }

    org.members.push(user._id);

    await org.save();

    res.status(200).json({
      message: "User Successfully Added",
      org,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getOrganizationMembersController = async (req, res) => {
  try {

    const page = req.query.page
    const limit = req.query.limit
    const search = req.query.search
    const org = req.organization;

    const members = org.members;

    const memberFilter = {
      _id:{
        $in:members
      }
    }

    let normalizedValue =""
    if(typeof search === "string"){
      normalizedValue= search.trim()
    }

    if(normalizedValue){
      let escapedValue = escapeFunction(normalizedValue)
      memberFilter.$or = [{name:{$regex:escapedValue,$options:"i"}},{email:{$regex:escapedValue,$options:"i"}}]
    }

    let normalizedPage = Number.parseInt(page,10)
    
    if(!normalizedPage){
      normalizedPage = 1
    }
    else if(normalizedPage<1){
      normalizedPage =1
    }

    let normalizedLimit = Number.parseInt(limit,10)

    if(!normalizedLimit){
      normalizedLimit = 10
    }
    else if(normalizedLimit<1){
      normalizedLimit = 10
    }
    else if(normalizedLimit>50){
      normalizedLimit = 50
    }

    const totalMembers = await userModel.countDocuments(memberFilter)

    const totalPages = Math.ceil(totalMembers/normalizedLimit)

    if(normalizedPage > totalPages){
      normalizedPage = totalPages
    }

    if(normalizedPage <1){
      normalizedPage = 1
    }

    const skip = (normalizedPage-1) * normalizedLimit 


    const users = await userModel
      .find(memberFilter)
      .select("_id name email createdAt").sort({createdAt:-1}).skip(skip).limit(normalizedLimit)
      .lean();

    const memberDetails = users.map((user) => ({
      ...user,
      role: user._id.toString() === org.owner.toString() ? "owner" : "member",
    }));

    


    const paginationObject = {
      page:normalizedPage,
      limit:normalizedLimit,
      totalMembers:totalMembers,
      totalPages:totalPages,
      hasNextPage : normalizedPage < totalPages,
      hasPreviousPage : normalizedPage > 1
    }

    res.status(200).json({
      message: "Members of Organization Found",
      members: memberDetails,
      pagination:paginationObject
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createController,
  getController,
  ownerController,
  singleOrganizationController,
  addMemberController,
  getOrganizationMembersController,
};
