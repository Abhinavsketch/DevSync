const express = require("express")
const {createController,getController,updateController} = require("./tasksController.js")

const router = express.Router()

router.post("/createtask/:projectId",createController)
router.get("/getTask/:projectId",getController)
router.post("/task/status/:taskId",updateController)
router.post("/task/assignee/:taskId",assignController)

module.exports = router