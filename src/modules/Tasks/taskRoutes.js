const express = require("express")
const {createController,getController,updateController,assignController} = require("./tasksController.js")
const authMiddleWare = require("../Authentication/authmiddleware.js")

const router = express.Router()

router.post("/createtask/:projectId",authMiddleWare,createController)
router.get("/getTask/:projectId",getController)
router.post("/status/:taskId",authMiddleWare,updateController)
router.post("/assignee/:taskId",assignController)
router.post("/delete/:taskId",authMiddleWare,deleteController)

module.exports = router