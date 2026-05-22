const express = require("express")
const {createProject,getProject,updateController,deleteController} = require("./projectController.js")

const router = express.Router()

router.post("/create/:teamId",createProject)
router.get("/getProject/:teamId",getProject)
router .post("/update/:projectId",updateController)
router.post("delete/:projectId",deleteController)

module.exports = router