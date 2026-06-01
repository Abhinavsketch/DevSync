const express = require("express")
const {sendMessageController,getMessageController,deleteMessageController,editMessageController} = require("./teamChatController.js")
const authMiddleWare = require("../Authentication/authmiddleware.js")
const router = express.Router()

router.post("/sendMessage/:teamId",authMiddleWare,sendMessageController)
router.get("/getMessage/:teamId",authMiddleWare,getMessageController)
router.post("/deleteMessage/:messageId",authMiddleWare,deleteMessageController)
router.post("/edit/:messageId",authMiddleWare,editMessageController)

module.exports = router

