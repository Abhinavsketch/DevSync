const express = require("express")
const {createController,orgTeam,addMember,teamMember,removemember,changeRole} = require("./teamController.js")
const authMiddleWare = require("../Authentication/authmiddleware.js")

const router = express.Router()

router.post("/create/:id",authMiddleWare,createController)
router.get("/getTeam/:id",orgTeam)
router.post("/addmember/:id",authMiddleWare,addMember)
router.get("/getteammember/:id",teamMember)
router.post("/removemembers/:teamid/:userid",authMiddleWare,removemember)
router.post("/changerole/:teamid/:userid",authMiddleWare,changeRole)

module.exports = router