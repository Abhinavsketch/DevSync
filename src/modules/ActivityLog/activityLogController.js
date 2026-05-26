const express = require("express")
const activityModel = require("../ActivityLog/activityLogModel.js")

const ChangeController = async (req,res)=>{
    try{
        const orgId = req.params.id
        if(!orgId){
            return res.status(400).json({
                message:"Organization Id is not found"
            })
        }

        const activities = await activityModel.find({organization:orgId}).sort({createdAt:-1}).populate("actor").populate("project").populate("entity")
        if(activities.length === 0){
            return res.status(200).json({
                message:"Activities not found",
                activities:[]
            })
        }

        res.status(200).json({
            message:"Activities Found",
            activity:activities
        })


    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const taskChangeController = async (req,res)=>{
    try{
        const orgId = req.params.id
        if(!orgId){
            return res.status(400).json({
                message:"Organization Id is not found"
            })
        }

        const activities = await activityModel.find({
                organization:orgId,
                entityType:"Task"
        }).sort({createdAt:-1}).populate("actor").populate("project").populate("entity")

        if(activities.length == 0 ){
            return res.status(200).json({
                message:"Activities not found",
                activities:[]
            })
        }

        res.status(200).json({
            message:"Activities Found",
            activity:activities
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}


const teamChangeController = async (req,res)=>{
    try{
        const orgId = req.params.id
        if(!orgId){
            return res.status(400 ).json({
                message:"Organization Id is not found"
            })
        }

        const activities = await activityModel.find({
                organization:orgId,
                entityType:"Team"
        }).sort({createdAt:-1}).populate("actor").populate("project").populate("entity")

        if(activities.length == 0 ){
            return res.status(200).json({
                message:"Activities not found",
                activities:[]
            })
        }

        res.status(200).json({
            message:"Activities Found",
            activity:activities
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}



const projectChangeController = async (req,res)=>{
    try{
        const orgId = req.params.id
        if(!orgId){
            return res.status(404).json({
                message:"Organization Id is not found"
            })
        }

        const activities = await activityModel.find({
                organization:orgId,
                entityType:"Project"
        }).sort({createdAt:-1}).populate("actor").populate("project").populate("entity")

        if(activities.length == 0 ){
            return res.status(200).json({
                message:"Activities not found",
                activities:[]
            })
        }

        res.status(200).json({
            message:"Activities Found",
            activity:activities
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}


module.exports = {
    ChangeController,
    taskChangeController,
    teamChangeController,
    projectChangeController
}