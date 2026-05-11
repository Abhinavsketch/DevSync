const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser")
const authRouter = require("./modules/Authetication/authRoutes.js")

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookie());

app.get("/",(req,res)=>{
    res.send("DevSync Backend Making start")
})

app.use("/api/auth",authRouter)

module.exports = app;