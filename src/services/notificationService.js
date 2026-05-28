const express = require("express")
const notificationModel = require("../modules/notification/notificationModel.js")

const createNotification = async ({receiver,sender,action,message,entityType,entityId,organization,read})=>{
    return await notificationModel.create({
        receiver,
        sender,
        action,
        message,
        entityType,
        entityId,
        organization,
        read
    })
}

module.exports = createNotification