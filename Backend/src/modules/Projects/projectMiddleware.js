const mongoose = require("mongoose")
const projectModel = require("../Projects/projectModel.js")
const teamModel = require("../Team/teamModel.js")
const orgModel = require("../Organization/orgModels.js")

const project = async (req,res,next)=>{
    try{
        const projectId = req.params.projectId
        const teamId = req.params.teamId

        let team;

        if(projectId){
            if(!mongoose.isObjectIdOrHexString(projectId)){
                return res.status(400).json({
                    message:"Object Id is not valid."
                })
            }

            const project = await projectModel.findById(projectId).populate("team");

            if(!project){
                return res.status(404).json({
                    message:"Project not found."
                })
            }

            team = project.team;

            req.project = project
        }
        else if(teamId){
            if(!mongoose.isObjectIdOrHexString(teamId)){
                return res.status(400).json({
                    message:"Team id is not found."
                })
            }

            team = await teamModel.findById(teamId)

            if(!team){
                return res.status(404).json({
                    message:"Team not Found."
                })
            }
        }
        else{
            return res.status(404).json({
                message:"Project and Team Id is not found"
            })
        }

        const org = await orgModel.findById(team.organization)
        if(!org){
            return res.status(404).json({
                message:"Organization not found."
            })
        }

        const isOwner = req.user.id.toString() === org.owner.toString()
        if(!isOwner){
            return res.status(403).json({
                message:"You are not Owner of the organization."
            })
        }

        req.team = team;

        next();

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}   

module.exports = project