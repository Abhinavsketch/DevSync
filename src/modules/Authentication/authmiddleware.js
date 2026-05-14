const express = require("express")
const jwt = require("jsonwebtoken")
const config = require("../../config/config.js")

const authMiddleWare = async (req,res,next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({
                message:"Something went wrong"
            })
        }

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