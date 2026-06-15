const express = require("express")
const jwt = require("jsonwebtoken")
const config = require("../../config/config.js")
const userModel = require("./authModels.js")

const authMiddleWare = async (req,res,next)=>{
    try{

        const authHeader = req.headers.authorization
        if(!authHeader){
            return res.status(401).json({
                message:"Token not found"
            })
        }

        const token = authHeader.split(" ")[1]
        if(!token){
            return res.status(401).json({
                message:"Invalid token format"
            })
        }

        const decoded = jwt.verify(token,config.SECRET_KEY)

        const user = await userModel.findById(decoded.id).select("-password")
        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }

        req.user = {
            id:user.id,
            _id:user._id,
            name:user.name,
            email:user.email
        }

        next()
    }
    catch(error){
        res.status(401).json({
            message:error.message
        })
    }
}   

module.exports = authMiddleWare
