const express = require("express")
const {createProject} = require("./projectController.js")

const router = express.Router()

router.post("/create/:teamId",createProject)

module.exports = router