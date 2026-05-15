const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser")
const authRouter = require("./modules/Authentication/authRoutes.js")
const orgRouter = require("./modules/Organization/orgRoutes.js")



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.get("/",(req,res)=>{
    res.send("DevSync Backend Making start")
})

app.use("/api/auth",authRouter)
app.use("/organization",orgRouter)

module.exports = app;