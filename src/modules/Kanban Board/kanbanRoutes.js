const express = require("express")

const router = express.Router()

router.post("/status/:projectId",statusController)

module.exports = router