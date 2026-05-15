const express = require("express")
const {createController} = require("./orgController.js")
const authMiddleWare = require("../Authentication/authmiddleware.js")

const router = express.Router()

router.post("/create",authMiddleWare,createController)

module.exports = router