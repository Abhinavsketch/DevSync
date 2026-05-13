const app = require("./app");
const config = require("./config/config.js")
const connectDB = require("./config/db.js")

const startServer = async ()=>{
    try{
        await connectDB();

        app.listen(5000,()=>{
            console.log("Backend Running")
        })
    }
    catch(error){
        console.log(error)
    }
}

startServer()