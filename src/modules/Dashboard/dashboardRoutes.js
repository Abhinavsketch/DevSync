const express = require("express")
const {totalteamController,totalProjectController,totaltaskController,totaltodoController,totalprogressController,totalreviewController, totaldoneController} = require("./dashboardController.js")

const router = express.Router()

router.get("/totalteam/:id",totalteamController)
router.get("/totalproject/:id",totalProjectController)
router.get("/totaltask/:id",totaltaskController)
router.get("/todotask/:id",totaltodoController)
router.get("/totalprogress/:id",totalprogressController)
router.get("/totalreview/:id",totalreviewController)
router.get("/totaldone/:id",totaldoneController)

module.exports = router