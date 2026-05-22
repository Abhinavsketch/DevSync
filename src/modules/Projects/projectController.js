const express = require("express")
const projectModel = require("./projectModel.js")
const teamModel = require("../Team/teamModel.js")

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

        const project = await projectModel.findById(projectId)
        if(!project){
            return res.status(404).json({
                message:"Project not Found"
            })
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

module.exports = {
    createProject,
    getProject,
    updateController
}