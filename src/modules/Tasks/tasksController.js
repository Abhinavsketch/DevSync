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

const getController = async (req,res)=>{
    try{
        const projectId = req.params.projectId
        if(!projectId){
            return res.status(404).json({
                message:"Project Id not found"
            })
        }

        const project = await projectModel.findById(projectId).populate("tasks")
        if(!project){
            return res.status(404).json({
                message:"Project is not found"
            })
        }

        if(project.tasks.length === 0){
            return res.status(200).json({
                message:"Taks not found",
                tasks:[]
            })
        }

        res.status(200).json({
            message:"Tasks Found Successfully",
            tasks : project.tasks
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const updateController = async (req,res)=>{
    try{
        const taskId = req.params.taskId;
        if(!taskId){
            return res.status(404).json({
                message:"Task Id not found"
            })
        }

        const {status} = req.body
        
        const task = await taskModel.findById(taskId)
        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        task.status = status
        await task.save()

        res.status(200).json({
            message:"Status Update Successfully",
            task
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const assignController = async (req,res)=>{
    try{
        const taskId = req.params.taskId
        if(!taskId){
            return res.status(400).json({
                message:"Task Id not found."
            })
        }

        const {email} = req.body

        const task = await taskModel.findById(taskId)
        if(!task){
            return res.status(404).json({
                message:"Task Not Found"
            })
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).json({
                message:"User Not Found"
            })
        }



        task.assignee = user._id
        await task.save()

        res.status(200).json({
            message:"Task Assign Successfully",
            task
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const deleteController = async (req,res)=>{
    try{
        const taskId = req.params.taskId
        if(!taskId){
            return res.status(400).json({
                message:"TaskId not Found"
            })
        }

        const task = await taskModel.findById(taskId)
        if(!task){
            return res.status(404).json({
                message:"Task not found"
            })
        }

        const project = await projectModel.findById(task.project)
        if(!project){
            return res.status(404).json({
                message:"Project Not Found"
            })
        }

        const remainingTask = project.tasks.filter(
            task => task.toString() !== taskId.toString()
        )
        
        project.tasks = remainingTask
        await project.save()

        await taskModel.findByIdAndDelete(taskId)

        res.status(200).json({
            message:"Tasks Deleted Successfully",
            projectModel
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
    updateController,
    assignController
}