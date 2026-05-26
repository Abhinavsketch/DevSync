const express = require("express")
const projectModel = require("./projectModel.js")
const teamModel = require("../Team/teamModel.js")
const taskModel = require("../Tasks/taskModel.js")
const activityLogger = require("../../utils/activityLog.js")

const createProject = async (req,res)=>{
    try{
        const teamId = req.params.teamId
        const {title,description,status,deadline} = req.body
        if(!teamId){
            return res.status(404).json({
                message:"Team not found"
            })
        }

        const team = await teamModel.findById(teamId)
        if(!team){
            return res.status(404).json({
                message:"Team not found"
            })
        }

        const project = await projectModel.create({
            title,
            description,
            team:teamId,
            status,
            deadline
        })

        team.projects.push(project._id)
        await team.save()

        await activityLogger({
            actor:req.user._id,
            project:project._id,
            organization:team.organization,
            entityType:"Project",
            entity:project._id,
            action:"CREATE_PROJECT",
            message:`${req.user.name} created project`,
            oldValue:null,
            newValue:{
                title:project.title,
                status:project.status,
                deadline:project.deadline
            }
            
        })

        res.status(201).json({
            message:"Project Created Successfully",
            project,
            team
        })

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const getProject = async (req,res)=>{
    try{
        const teamId = req.params.teamId
        if(!teamId){
            return res.status(400).json({
                message:"Team Id not found"
            })
        }

        const team = await teamModel.findById(teamId).populate("projects")
        if(!team){
            return res.status(404).json({
                message:"Team not found"
            })
        }

        if(team.projects.length === 0){
            return res.status(404).json({
                message:"Project not found"
            })
        }

        res.status(200).json({
            message:"Projects Fonud Successflly",
            projects:team.projects
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
        const projectId = req.params.projectId
        if(!projectId){
            return res.status(400).json({
                message:"Project Id not Found"
            })
        }

        const {title,description,status,deadline} = req.body

        const project = await projectModel.findById(projectId).populate("team")
        if(!project){
            return res.status(404).json({
                message:"Project not Found"
            })
        }

        const orgId = project.team.organization

        const oldProject = {
            title:project.title,
            description:project.description,
            status:project.status,
            deadline:project.deadline
        }

        if(title){
            project.title = title
        }
        if(description){
            project.description = description
        }
        
        if(status){
            project.status = status
        }
        
        if(deadline){
            project.deadline = deadline
        }



        await project.save()

        await activityLogger({
            actor:req.user._id,
            project:projectId,
            organization:orgId,
            entityType:"Project",
            entity:projectId,
            action:"UPDATE_PROJECT",
            message:`${req.user.name} updated the Project`,
            oldValue:oldProject,
            newValue:{
                title:project.title,
                description:project.description,
                status:project.status,
                deadline:project.deadline
            }
        })

        res.status(200).json({
            message:"project Updated Successfully",
            project
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
        const projectId = req.params.projectId
        if(!projectId){
            return res.status(404).json({
                message:"Project Id not found"
            })
        }

        const project = await projectModel.findById(projectId)
        if(!project){
            return res.status(404).json({
                message:"Project not Found"
            })
        }

        const oldProject = {
            title:project.title,
            description:project.description,
            status:project.status,
            deadline:project.deadline
        }

        await taskModel.deleteMany({
            _id:{
                $in:project.tasks
            }
        })

        const team = await teamModel.findById(project.team)
        if(!team){
            return res.status(404).json({
                message:"Team not found"
            })
        }

        const remainingProject = team.projects.filter(
            project => project.toString() !== projectId.toString()
        )

        team.projects = remainingProject
        await team.save()

        await projectModel.findByIdAndDelete(projectId)

        await activityLogger({
            actor:req.user._id,
            project:projectId,
            organization:team.organization,
            entityType:"Project",
            entity:projectId,
            action:"DELETE_PROJECT",
            message:`${req.user.name} deleted  project ${oldProject.title}`,
            oldValue:oldProject,
            newValue:null
        })

        res.status(200).json({
            message:"Project Deleted Successfully",
            project,
            team
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = {
    createProject,
    getProject,
    updateController,
    deleteController
}