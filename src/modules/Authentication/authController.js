const express = require("express");
const userModel = require("./authModels.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../../config/config.js");
const cookie = require("cookie-parser")

const signupController =async (req,res)=>{
    const {name,email,password} = req.body;
    const isAlreadyRegister = await userModel.findOne({
        $or:[
            {email}
        ]
    })

    if(isAlreadyRegister){
        return res.status(400).json({
            message:"User already exits"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);
    const user = await userModel.create({
        name,
        email,
        password:hashedPassword
    })

    const token = jwt.sign({
        id:user.id
    },config.SECRET_KEY,{
        expiresIn:"7d"
    })

    res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    })

    user.password = undefined

    res.status(201).json({
        message:"user successfull created",
        user,
    })
    
}

const loginController = async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await userModel.findOne({
            $or:[
                {email}
            ]
        })
        if(!user){
            return res.status(400).json({
                message:"User Not Found"
            })
        }
        const pass = await bcrypt.compare(password,user.password)

        if(!pass){
            return res.status(400).json({
                message:"Check your credentials"
            })
        }

        const token = jwt.sign({
            id:user.id
        },config.SECRET_KEY,{
            expiresIn:"7d"
        })

        res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:7*24*60*60*1000
        })

        user.password = undefined;

        res.status(200).json({
            message:"User Found",
            user,
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

const getmeController = async (req,res)=>{
    try{
        const user = await userModel.findById(
            req.user.id
        )

        if(!user){
           return res.status(400).json({
                message:"User not found"
            })
        }
        
        user.password = undefined

        res.status(200).json({
            message:"User successfully found",
            user
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }

}

module.exports = {
    signupController,
    loginController,
    getmeController
}