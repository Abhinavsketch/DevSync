const express = require("express")
const orgModel = require("./orgModels.js")
const userModel = require("../Authentication/authModels.js")
const { default: mongoose } = require("mongoose")

const createController = async (req,res)=>{
    try{
        const user = req.user.id
        const {name,description} = req.body

        if(!user){
            return res.status(400).json({
                message:"Invalid User"
            })
        }

        const organization = await orgModel.create({
            name,
            description,
            owner:user,
            members:[user]
        })

        res.status(200).json({
            message:"Organization Successfull Created",
            organization
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const getController = async (req,res)=>{
    try{
        const user = req.user.id

        if(!user){
            return res.status(400).json({
                message:"Invalid User"
            })
        }

        const orgList = await orgModel.find({members:user});


        res.status(200).json({
            message:"Organization Found",
            orgList
        })

    }
    catch(error){
        res.status(500).json({
            message:"Organization not found"
        })
    }
}

const ownerController = async (req,res)=>{
    try{
        const user = req.user.id
        if(!user){
            return res.status(400).json({
                message:"User not found"
            })
        }

        const ownOrg = await orgModel.find({owner:user})

        if(ownOrg.length === 0){
            return res.status(401).json({
                message:"User doesn't have any organization yet"
            })
        }

        res.status(200).json({
            message:"User own Organization",
            ownOrg
        })

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const singleOrganizationController = async (req,res)=>{
    try{
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                message:"No Data Found"
            })
        }

        const org = await orgModel.findById(id).populate("members").populate("teams")
        if(!org){
            return res.status(400).json({
                message:"No Data Found"
            })
        }

        res.status(200).json({
            message:"Organization Found",
            org
        })

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const addMemberController = async (req,res)=>{
    try{
        const id = req.params.id
        const {email} = req.body

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }

        const org = await orgModel.findById(id)
        if(!org){
            return res.status(401).json({
                message:"Organization Not Found"
            })
        }

        const duplicate = org.members.includes(user._id)
        if(duplicate){
            return res.status(401).json({
                message:"User Already Exits in this organization"
            })
        }

        org.members.push(user._id)

        await org.save()

        res.status(200).json({
            message:"User Successfull Created",
            org
        })

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = {
    createController,
    getController,
    ownerController,
    singleOrganizationController,
    addMemberController
}
