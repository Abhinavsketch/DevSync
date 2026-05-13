const moongoose = require("mongoose")

const connectDB = async()=>{
    try{
        await moongoose.connect(process.env.MONGO_URI)
        console.log("Connection successfull")
    }

    catch(error){
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB;