const activityModel = require("../modules/ActivityLog/activityLogModel.js")

const activityLogger = async ({actor,project,entityType,entity,action,message,oldValue,newValue})=>{
    await activityModel.create({
        actor,
        project,
        entityType,
        entity,
        action,
        message,
        oldValue,
        newValue
    })
}

module.exports = activityLogger
