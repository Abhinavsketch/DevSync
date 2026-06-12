const express = require("express")
const {totalteamController,totalProjectController,totaltaskController,totaltodoController,totalprogressController,totalreviewController, totaldoneController,organizationInfoController,previewactivityController,previewteamController,previewprojectController} = require("./dashboardController.js")

const router = express.Router()

router.get("/totalteam/:id",totalteamController)
router.get("/totalproject/:id",totalProjectController)
router.get("/totaltask/:id",totaltaskController)
router.get("/todotask/:id",totaltodoController)
router.get("/totalprogress/:id",totalprogressController)
router.get("/totalreview/:id",totalreviewController)
router.get("/totaldone/:id",totaldoneController)
router.get("/orgInfo/:id",organizationInfoController)
router.get("/previewactivity/:id",previewactivityController)
router.get("/previewteam/:id",previewteamController)
router.get("/previewproject/:id",previewprojectController)

module.exports = router