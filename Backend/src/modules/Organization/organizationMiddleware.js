const orgModel = require("./orgModels.js")
const mongoose = require("mongoose")


const organizationMiddleware = async (req,res,next)=>{
    try{
        const orgId = req.params.id
        if(!orgId){
            return res.status(400).json({
                message:"Organization Id not found"
            })
        }

        if(!mongoose.isObjectIdOrHexString(orgId)){
            return res.status(400).json({
                message:"Organization Id is not valid"
            })
        }

        const organization = await orgModel.findById(orgId)
        if(!organization){
            return res.status(404).json({
                message:"Organization Not Found"
            })
        }

        const isMember = organization.members.some(
            member => member.toString() === req.user.id.toString()
        )


        const isOwner = organization.owner.toString() === req.user.id.toString()

        if(!isMember && !isOwner){
            return res.status(403).json({
                message:"You are not the member of organization"
            })
        }

        req.organization = organization

        next()


    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const organizationOwnerMiddleware =  (req,res,next)=>{
    try{
        const isOwner = req.organization.owner.toString() === req.user.id.toString()

        if(!isOwner){
            return res.status(403).json({
                message:"Only the organization owner can perform this action"
            })
        }

        next()
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

module.exports = {organizationMiddleware,
    organizationOwnerMiddleware
}