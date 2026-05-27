const express = require("express")
const orgModule = require("../Organization/orgModels.js")
const teamModel = require("../Team/teamModel.js")
const projectModel = require("../Projects/projectModel.js")
const taskModel = require("../Tasks/taskModel.js")

const totalteamController = async (req,res)=>{
    try{
        const orgId = req.params.id
        if(!orgId){
            return res.status(400).json({
                message:"Organization ID not found"
            })
        }

        const organization = await orgModule.findById(orgId)
        if(!organization){
            return res.status(400).json({
                message:"Organization not found"
            })
        }

        const totalCount = organization.teams.length

        

        res.status(200).json({
            message:"Total Team Found",
            totalCount
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const totalProjectController = async (req,res)=>{
    try{
        const orgId = req.params.id
        if(!orgId){
            return res.status(400).json({
                message:"Organization ID not found"
            })
        }

        const organization = await orgModule.findById(orgId).populate("teams")
        if(!organization){
            return res.status(400).json({
                message:"Organization not found"
            })
        }

        let totalProjects = 0;

        organization.teams.forEach((team)=>{
            totalProjects += team.projects.length
        })

        res.status(200).json({
            message:"Total Project Found",
            totalProjects
        })

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const totaltaskController = async(req,res)=>{
    try{

        const orgId = req.params.id
        if(!orgId){
            return res.status(400).json({
                message:"Organization Id is not found"
            })
        }

        const teams = await teamModel.find({
                organization:orgId
        })

        if(teams.length === 0){
            return res.status(200).json({
                message:"Team is not found",
                teams:[]
            })
        }

        const teamIds = teams.map((team)=>{
            return team._id
        })

        const projects = await projectModel.find({
            team:{
                $in:teamIds
            }
        })

        if(projects.length === 0){
            return res.status(200).json({
                message:"Project Not Found",
                project:[]
            })
        }

        const projectIds = projects.map(project => project._id)

        const task = await taskModel.countDocuments({
            project:{
                $in:projectIds
            }
        })

        res.status(200).json({
            message:"Total Tasks Found",
            tasks:task
        })

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const totaltodoController = async (req,res)=>{
    try{
        const orgId = req.params.id
        if(!orgId){
            return res.status(400).json({
                message:"Organization Id not found"
            })
        }

        const team = await teamModel.find({
            organization:orgId
        })
        if(team.length === 0){
            return res.status(200).json({
                message:"Team not found",
                team:[]
            })
        }

        const teamIds = team.map(team => team._id)

        const projects = await projectModel.find({
            team:{
                $in:teamIds
            }
        })

        if(projects.length === 0 ){
            return res.status(200).json({
                message:"Project not found",
                project:[]
            })
        }

        const projectIds = projects.map(project => project._id)

        const task = await taskModel.countDocuments({
            project:{
                $in:projectIds
            },
            status:"to-do"
        })


        res.status(200).json({
            message:"Total To Do Task Found",
            ToDo:task
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const totalprogressController = async (req,res)=>{
    try{
        const orgId = req.params.id
        if(!orgId){
            return res.status(400).json({
                message:"Organization Id is not found"
            })
        }

        const teams = await teamModel.find({organization:orgId})
        if(teams.length === 0){
            return res.status(200).json({
                message:"Team not found",
                team:[]
            })
        }

        const teamIds = teams.map(team => team._id)

        const projects = await projectModel.find({
            team:{
                $in:teamIds
            }
        })
        if(projects.length ===0 ){
            return res.status(200).json({
                message:"Project Not Found",
                projects:[]
            })
        }

        const projectIds = projects.map(project => project._id)

        const task = await taskModel.countDocuments({
            project:{
                $in:projectIds
            },
            status:"in-progress"
        })

        res.status(200).json({
            message:"Total In-Progress Task Found",
            totalInProgress:task
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const totalreviewController = async (req,res)=>{
    try{
        const orgId = req.params.id
        if(!orgId){
            return res.status(400).json({
                message:"Organization Id is not found"
            })
        }

        const teams = await teamModel.find({organization:orgId})
        if(teams.length === 0){
            return res.status(200).json({
                message:"Team not found",
                team:[]
            })
        }

        const teamIds = teams.map(team => team._id)

        const projects = await projectModel.find({
            team:{
                $in:teamIds
            }
        })
        if(projects.length ===0 ){
            return res.status(200).json({
                message:"Project Not Found",
                projects:[]
            })
        }

        const projectIds = projects.map(project => project._id)

        const task = await taskModel.countDocuments({
            project:{
                $in:projectIds
            },
            status:"review"
        })

        res.status(200).json({
            message:"Total review Task Found",
            totalInProgress:task
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const totaldoneController = async (req,res)=>{
    try{
        const orgId = req.params.id
        if(!orgId){
            return res.status(400).json({
                message:"Organization Id is not found"
            })
        }

        const teams = await teamModel.find({organization:orgId})
        if(teams.length === 0){
            return res.status(200).json({
                message:"Team not found",
                team:[]
            })
        }

        const teamIds = teams.map(team => team._id)

        const projects = await projectModel.find({
            team:{
                $in:teamIds
            }
        })
        if(projects.length ===0 ){
            return res.status(200).json({
                message:"Project Not Found",
                projects:[]
            })
        }

        const projectIds = projects.map(project => project._id)

        const task = await taskModel.countDocuments({
            project:{
                $in:projectIds
            },
            status:"done"
        })

        res.status(200).json({
            message:"Total Done Task Found",
            totalInProgress:task
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports={
    totalteamController,
    totalProjectController,
    totaltaskController,
    totaltodoController,
    totalprogressController,
    totalreviewController,
    totaldoneController
}