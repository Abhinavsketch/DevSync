const express = require("express")
const {signupController,loginController,getmeController} = require("./authController.js")

const router = express.Router();

router.post("/signup",signupController)

router.post("./getme",getmeController)

router.post("/login",loginController)

router.post("/logout",logoutController)

module.exports = router;