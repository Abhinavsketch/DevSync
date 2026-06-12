const express = require("express")
const projectModel = require("../Projects/projectModel.js")

const statusController = async (req,res)=>{
    try{
        const projectId = req.params.projectId
        if(!projectId){
            return res.status(400).json({
                message:"Project ID not found"
            })
        }

        const project = await projectModel.findById(projectId).populate("tasks")
        if(!project){
            return res.status(404).json({
                message:"Project not found"
            })
        }

        const board = project.tasks.reduce(
            (acc,task)=>{
                acc[task.status].push(task)

                return acc
            },{
                "to-do":[],
                "in-progress":[],
                review:[],
                done:[]
            }
        )

        res.status(200).json({
            message:"Task Status",
            board
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = {
    statusController
}