const express = require("express")
const {sendMessageController,getMessageController,deleteMessageController,editMessageController,uploadController} = require("./teamChatController.js")
const authMiddleWare = require("../Authentication/authmiddleware.js")
const uploadMiddleWare = require("../../middleware/upload.js")
const router = express.Router()

router.post("/sendMessage/:teamId",authMiddleWare,sendMessageController)
router.get("/getMessage/:teamId",authMiddleWare,getMessageController)
router.post("/deleteMessage/:messageId",authMiddleWare,deleteMessageController)
router.post("/edit/:messageId",authMiddleWare,editMessageController)
router.post("/:teamId/upload", authMiddleWare, uploadMiddleWare.single("chatFiles"), uploadController)

module.exports = router

