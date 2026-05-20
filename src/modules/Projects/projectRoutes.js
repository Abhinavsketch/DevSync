const express = require("express")
const {createProject,getProject} = require("./projectController.js")

const router = express.Router()

router.post("/create/:teamId",createProject)
router.get("/getProject/:teamId",getProject)

module.exports = router