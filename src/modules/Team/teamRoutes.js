const express = require("express")
const {createController} = require()

const router = express.Router()

router.post("/create/:id",createController)

module.exports = router