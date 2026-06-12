const notificationModel = require("../modules/notification/notificationModel.js")
const {getIo} = require("../modules/realTime/socketManager.js")


const createNotification = async ({receiver,sender,action,message,entityType,entityId,organization,read})=>{
    const notification =  await notificationModel.create({
        receiver,
        sender,
        action,
        message,
        entityType,
        entityId,
        organization,
        read
    })

    const io = getIo()
    io.to(`user:${notification.receiver}`).emit("receive-notification",notification)

    return notification

}


module.exports = createNotification