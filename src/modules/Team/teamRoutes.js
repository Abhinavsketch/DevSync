const express = require("express")
const {createController,orgTeam,addMember,teamMember} = require("./teamController.js")

const router = express.Router()

router.post("/create/:id",createController)
router.get("/getTeam/:id",orgTeam)
router.post("/addmember/:id",addMember)
router.get("/getteammember/:id",teamMember)

module.exports = router