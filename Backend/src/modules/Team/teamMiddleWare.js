const mongoose = require("mongoose")
const teamModel = require("./teamModel.js")
const organizationModel = require("../Organization/orgModels.js")

const teamMiddleware = async(req,res,next)=>{
    try{
        const teamId = req.params.teamid || req.params.id;
        if(!teamId){
            return res.status(400).json({
                message:"Team Id Not Found."
            })
        }

        if(!mongoose.isObjectIdOrHexString(teamId)){
            return res.status(400).json({
                message:"Team Id is not Valid."
            })
        }

        const team = await teamModel.findById(teamId)

        if(!team){
            return res.status(404).json({
                message:"Team not found."
            })
        }

        const org = await organizationModel.findById(team.organization) 
        if(!org){
            return res.status(404).json({
                message:"You are not the member of organization."
            })
        }

        const isOwner = org.owner.toString() === req.user.id.toString()
        if(!isOwner){
            return res.status(403).json({
                message:"You are not the Owner of the Organization."
            })
        }

        req.team = team

        next()

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = teamMiddleware;