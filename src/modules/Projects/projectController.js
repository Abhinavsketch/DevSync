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

module.exports = {
    createProject
}