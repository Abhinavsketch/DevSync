const express = require("express")
const taskModel = require("./taskModel.js")
const projectModel = require("../Projects/projectModel.js")
const userModel = require("../Authentication/authModels.js")

const createController = async (req,res)=>{
    try{
        const projectId = req.params.projectId
        if(!projectId){
            return res.status(400).json({
                message:"Project Id is not found"
            })
        }

        const {title,description,email,status,priority,deadline} = req.body
        
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"Assigne not found"
            })
        }

        const project = await projectModel.findById(projectId)
        if(!project){
            return res.status(404).json({
                message:"Project not found"
            })
        }

        const task = await taskModel.create({
            title,
            description,
            project:projectId,
            assignee:user._id,
            status,
            priority,
            deadline
        })

        project.tasks.push(task._id)
        await project.save()

        res.status(201).json({
            message:"Task Created Successfully",
            task,
            project
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = {
    createController
}