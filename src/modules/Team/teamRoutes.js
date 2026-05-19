const express = require("express")
const {createController} = require("./teamController.js")

const router = express.Router()

router.post("/create/:id",createController)
router.get("/getTeam/:id",orgTeam)

module.exports = router