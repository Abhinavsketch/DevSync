const express = require("express")
const {createProject,getProject,updateController,deleteController} = require("./projectController.js")
const authMiddleWare = require("../Authentication/authmiddleware.js")

const router = express.Router()

router.post("/create/:teamId",authMiddleWare,createProject)
router.get("/getProject/:teamId",authMiddleWare,getProject)
router.post("/update/:projectId",authMiddleWare,updateController)
router.post("/delete/:projectId",authMiddleWare,deleteController)

module.exports = router
