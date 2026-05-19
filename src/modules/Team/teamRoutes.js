const express = require("express")
const {createController,orgTeam,addMember,teamMember,removemember} = require("./teamController.js")

const router = express.Router()

router.post("/create/:id",createController)
router.get("/getTeam/:id",orgTeam)
router.post("/addmember/:id",addMember)
router.get("/getteammember/:id",teamMember)
router.post("/removemembers/:teamid/:userid",removemember)

module.exports = router