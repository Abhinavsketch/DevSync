const express = require("express")
const {createController,getController,updateController,assignController} = require("./tasksController.js")

const router = express.Router()

router.post("/createtask/:projectId",createController)
router.get("/getTask/:projectId",getController)
router.post("/status/:taskId",updateController)
router.post("/assignee/:taskId",assignController)
router.post("/delete/:taskId",deleteController)

module.exports = router