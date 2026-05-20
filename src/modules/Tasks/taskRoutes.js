const express = require("express")
const 

const router = express.Router()

router.post("/createtask/:projectId",createController)

module.exports = router