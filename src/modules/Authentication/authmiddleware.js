const express = require("express")
const jwt = require("jsonwebtoken")
const config = require("../../config/config.js")

const authMiddleWare = async (req,res,next)=>{
    try{
        const authHead = req.headers.authorization;
        if(!authHead){
            return res.status(400).json({
                message:"Token not found"
            })
        }

        const token = authHead.split(" ")[1]
        const decoded = jwt.verify(token,config.SECRET_KEY)

        req.user = decoded

        next()
    }
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}   

module.exports = authMiddleWare