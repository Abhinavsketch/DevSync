const express = require("express");
const userModel = require("./authModels.js")
const bcrypt = require("bcrypt")

const signupController =async (req,res)=>{
    const {name,email,password} = req.body;
    const isAlreadyRegister = await userModel.findOne({
        $or:[
            {name},
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
    res.status(500).json({
        message:"user successfull created",
        user
    })
    
}

module.exports = {
    signupController
}