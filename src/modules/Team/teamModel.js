const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    organization:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Organization"
    },

    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },{
        role:{
            type:String,
            enum:["admin","member"],
            default:"member"

        }
    }]
},{
    timestamps:true
})

const Team = mongoose.model("Team",teamSchema)

module.exports = Team