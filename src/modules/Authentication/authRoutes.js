const express = require("express")
const {signupController,loginController,getmeController,refreshController,logoutController} = require("./authController.js")

const router = express.Router();

router.post("/signup",signupController)

router.post("./getme",getmeController)

router.post("/login",loginController)

router.post("/logout",logoutController)

router.post("/refresh",refreshController)

module.exports = router;