const { default: mongoose } = require("mongoose")

const express = require(express)
const teamModel = require("./teamModel.js")
const orgModel = require("../Organization/orgModels.js")

const createController = async (req,res)=>{
    try{
        const orgId = req.params.id
        const {name} = req.body
        if(!orgId){
            return res.status(401).json({
                message:"Invalid Organization"
            })
        }

        const team = await teamModel.create({
            name,
            organization:orgId
        })

        const org = await orgModel.findById(orgId)
        if(!org){
            return res.status(401).json({
                message:"Organization not found"
            })
        }

        org.teams.push(team._id)
        await org.save()

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

module.exports={
    createController
}