const app = require("./app");
const config = require("./config/config.js")
const connectDB = require("./config/db.js")

connectDB();



app.listen(config.PORT,()=>{
    console.log("backend running on port 5000")
})