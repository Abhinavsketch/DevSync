const moongoose = require("mongoose")
const config = require("./config.js")

const connectDB = async()=>{
    try{
        await moongoose.connect(config.MONGO_URI)
        console.log("Connection successfull")
    }

    catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;