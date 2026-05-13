const express = require("express")
const {signupController} = require("./authController.js")

const router = express.Router();

router.post("/signup",signupController)

module.exports = router;