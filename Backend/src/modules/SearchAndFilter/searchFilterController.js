const express = require("express")
const teamModel = require("../Team/teamModel.js")
const projectModel = require("../Projects/projectModel.js")
const taskModel = require("../Tasks/taskModel.js")

const searchController = async (req,res)=>{
    try{
        const orgId = req.params.id
        if(!orgId){
            return res.status(400).json({
                message:"Organization Id not found"
            })
        }
        const query = req.query.query
        if(!query){
            return res.status(400).json({
                message:"Query not found"
            })
        }

        const team = await teamModel.find({organization:orgId,name:{$regex:query,$options:"i"}})
        if(team.length ===0){
            return res.status(200).json({
                message:"No Team Found Of this name",
                team:[]
            })
        }

        res.status(200).json({
            message:"Team Found",
            team:team
        })


    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const searchprojectController = async (req,res)=>{
    try{
        const teamId = req.params.id
        if(!teamId){
            return res.status(400).json({
                message:"Team Id not found"
            })
        }

        const query = req.query.query
        if(!query){
            return res.status(400).json({
                message:"Query not found"
            })
        }

        const projects = await projectModel.find({team:teamId,title:{$regex:query,$options:"i"}})
        if(projects.length === 0){
            return res.status(200).json({
                message:"Projects not found",
                projects:[]
            })
        }

        res.status(200).json({
            message:"Projects Found",
            projects:projects
        })


    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const searchtaskController = async (req,res)=>{
    try{
        const projectId = req.params.id
        if(!projectId){
            return res.status(400).json({
                message:"Project Id is not found"
            })
        }

        const query = req.query.query
        if(!query){
            return res.status(400).json({
                message:"Query Not Found"
            })
        }

        const tasks = await taskModel.find({project:projectId,title:{$regex:query,$options:"i"}})
        if(tasks.length === 0){
            return res.status(200).json({
                message:"Task not found",
                tasks:[]
            })
        }

        res.status(200).json({
            message:"Task Found",
            tasks:tasks
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const projectfilterController = async (req,res)=>{
    try{
        const teamId = req.params.id
        if(!teamId){
            return res.status(400).json({
                message:"Project Id not found"
            })
        }

        const status = req.query.status
        if(!status){
            return res.status(400).json({
                message:"Status not Found"
            })
        }

        const projects = await projectModel.find({team:teamId,status:status})
        if(projects.length === 0){
            return res.status(200).json({
                message:"Project of this status not found",
                projects:[]
            })
        }

        res.status(200).json({
            message:"Project Found",
            projects:projects
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    } 
}

module.exports={
    searchController,
    searchprojectController,
    searchtaskController,
    projectfilterController
}
