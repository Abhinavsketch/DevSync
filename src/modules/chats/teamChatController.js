const express = require("express")
const teamModel = require("../Team/teamModel.js")
const chatModel = require("../chats/teamChatModel.js")

const sendMessageController = async (req,res)=>{
    try{
        const teamId = req.params.teamId;
        if(!teamId){
            return res.status(400).json({
                message:"Team Id not found"
            })
        }

        const team = await teamModel.findById(teamId)
        if(!team){
            return res.status(404).json({
                message:"Team not found"
            })
        }

        const userId = req.user._id
        if(!userId){
            return res.status(400).json({
                message:"User Id is not found"
            })
        }

        const isteamMember = team.members.some(
            member =>member.user.toString() === userId.toString()
        )

        if(!isteamMember){
            return res.status(403).json({
                message:"User not the part of team"
            })
        }

        const content = req.body.content;
        if(!content || !content.trim()){
            return res.status(400).json({
                message:"Message is required"
            })
        }

        const chat = await chatModel.create({
            organization:team.organization,
            team:teamId,
            sender:userId,
            content:content.trim()
        })

        res.status(201).json({
            message:"Chat Created Successfully",
            chat
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}


const getMessageController = async (req,res)=>{
    try{
        const teamId = req.params.teamId
        if(!teamId){
            return res.status(400).json({
                message:"Team Id not found"
            })
        }

        const userId = req.user._id
        if(!userId){
            return res.status(400).json({
                message:"User Id is not found"
            })
        }

        const team = await teamModel.findById(teamId)
        if(!team){
            return res.status(404).json({
                message:"Team is not found"
            })
        }

        const isteamMember = team.members.some(
            member => member.user.toString() === userId.toString()
        )

        if(!isteamMember){
            return res.status(403).json({
                message:"User is not Team member"
            })
        }

        const chats = await chatModel.find({team:teamId,deletedAt:null}).sort({createdAt:1}).populate("sender","name email")
        if(chats.length === 0){
            return res.status(200).json({
                message:"No Chats Found Start the Conversation",
                chats:[]
            })
        }
        

        res.status(200).json({
            message:"Chats Found",
            chats:chats
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const deleteMessageController = async (req,res)=>{
    try{
        const messageId = req.params.messageId;
        if(!messageId){
            return res.status(400).json({
                message:"Message Id not found"
            })
        }

        const userId = req.user._id
        if(!userId){
            return res.status(400).json({
                message:"User Id not Found"
            })
        }

        const message = await chatModel.findById(messageId)
        if(!message){
            return res.status(404).json({
                message:"message not found"
            })
        }

        if(message.sender.toString() !== userId.toString()){
            return res.status(403).json({
                message:"You are not sender of this message"
            })
        }

        if(message.deletedAt !== null){
            return res.status(400).json({
                message:"Message Already Deleted"
            })
        }

        message.deletedAt = new Date()
        await message.save()

        res.status(200).json({
            message:"Message Deleted Successfully",
            messageId:message._id,
            messageDeletedAt:message.deletedAt
        })
        
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

const editMessageController = async (req,res)=>{
    try{
        const messageId = req.params.messageId
        if(!messageId){
            return res.status(400).json({
                message:"Message Id is not found"
            })
        }

        const userId = req.user._id
        if(!userId){
            return res.status(400).json({
                message:"User Id is not found"
            })
        }

        const message = await chatModel.findById(messageId)
        if(!message){
            return res.status(404).json({
                message:"Message not found"
            })
        }

        if(message.deletedAt !== null){
            return res.status(400).json({
                message:"Message already deleted"
            })
        }

        if(message.sender.toString() !== userId.toString()){
            return res.status(403).json({
                message:"You are not sender of this message"
            })
        }

        const newContent = req.body.content;
        if(!newContent || !newContent.trim()){
            return res.status(400).json({
                message:"No message found"
            })
        }

        message.content = newContent.trim();
        message.isEdited = true
        await message.save()

        res.status(200).json({
            message:"Message Edited Successfull",
            messageContent : message.content,
            messageId:messageId
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = {
    sendMessageController,
    getMessageController,
    deleteMessageController,
    editMessageController
}