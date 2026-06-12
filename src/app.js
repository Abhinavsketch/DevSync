const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser")
const authRouter = require("./modules/Authentication/authRoutes.js")
const orgRouter = require("./modules/Organization/orgRoutes.js")
const teamRouter = require("./modules/Team/teamRoutes.js")
const projectRoter = require("./modules/Projects/projectRoutes.js")
const taskRouter = require("./modules/Tasks/taskRoutes.js")
const kanbanRoutes = require("./modules/Kanban Board/kanbanRoutes.js")
const activityRoutes = require("./modules/ActivityLog/activityLogRoutes.js")
const dashboardRoutes = require("./modules/Dashboard/dashboardRoutes.js")
const searchFilterRoutes = require("./modules/SearchAndFilter/searchFilterroutes.js")
const notificationRoutes = require("./modules/notification/notificationRoutes.js")
const chatRoutes = require("./modules/chats/teamChatRoutes.js")


const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use("/uploads", express.static("uploads"));

app.get("/",(req,res)=>{
    res.send("DevSync Backend Making start")
})

app.use("/api/auth",authRouter)
app.use("/organization",orgRouter)
app.use("/team",teamRouter)
app.use("/project",projectRoter)
app.use("/task",taskRouter)
app.use("/kanban",kanbanRoutes)
app.use("/activity",activityRoutes)
app.use("/dashboard",dashboardRoutes)
app.use("/search",searchFilterRoutes)
app.use("/notify",notificationRoutes)
app.use("/chat",chatRoutes)

module.exports = app;