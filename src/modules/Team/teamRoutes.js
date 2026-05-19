const express = require("express")
const {createController,orgTeam,addMember,teamMember,removemember,changeRole} = require("./teamController.js")

const router = express.Router()

router.post("/create/:id",createController)
router.get("/getTeam/:id",orgTeam)
router.post("/addmember/:id",addMember)
router.get("/getteammember/:id",teamMember)
router.post("/removemembers/:teamid/:userid",removemember)
router.post("/changerole/:teamid/:userid",changeRole)

module.exports = router