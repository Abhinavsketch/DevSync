const mongoose = require("mongoose")

const activitySchema = new mongoose.Schema({
    actor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },
    entityType:{
        type:String,
        enum:["Task","Project","Team"]
    },
    entity:{
        type:mongoose.Schema.Types.ObjectId,
    },
    action:{
        type:String,
        enum:["CREATE_TASK","UPDATE_TASK","DELETE_TASK","STATUS_CHANGE","ADD_MEMBER","REMOVE_MEMBER","UPDATE_ROLE","CREATE_PROJECT","UPDATE_PROJECT","DELETE_PROJECT"]
    },
    message:{
        type:String
    },
    oldValue:{
        type:Object,
        default:null
    },
    newValue:{
        type:Object,
        default:null
    }
},{
    timestamps:true
})

const Activity = mongoose.model("Activity",activitySchema)

module.exports = Activity