const express = require("express")
const {createController,getController} = require("./tasksController.js")

const router = express.Router()

router.post("/createtask/:projectId",createController)
router.get("/getTask/:projectId",getController)

module.exports = router