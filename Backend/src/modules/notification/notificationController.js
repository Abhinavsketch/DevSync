const express = require("express")
const notificationModel = require("../notification/notificationModel.js")

const notifyController = async (req,res)=>{
    try{
        const orgId = req.params.id
        if(!orgId){
            return res.status(400).json({
                message:"Organizaition Id is not found",
            })
        }

        const userId = req.user._id
        if(!userId){
            return res.status(400).json({
                message:"User not found"
            })
        }

        const notifications = await notificationModel.find({receiver:userId,organization:orgId}).sort({createdAt:-1})
        if(notifications.length ===0){
            return res.status(200).json({
                message:"No Notifications Found",
                notifications:[]
            })
        }

        res.status(200).json({
            message:"Notifications Found",
            notifications:notifications
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const readController = async (req,res)=>{
    try{
        const notificationId = req.params.id
        if(!notificationId){
            return res.status(400).json({
                message:"Notification Id not found"
            })
        }

        const notification = await notificationModel.findById(notificationId)
        if(!notification){
            return res.status(400).json({
                message:"Notifaication Not Found"
            })
        }

        notification.read = true
        await notification.save()

        res.status(200).json({
            message:"You read this notification",
            notification
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = {
    notifyController,
    readController
}