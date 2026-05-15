const express = require("express")
const {createController,getController,ownerController,singleOrganizationController} = require("./orgController.js")
const authMiddleWare = require("../Authentication/authmiddleware.js")

const router = express.Router()

router.post("/create",authMiddleWare,createController)
router.get("/getorganization",authMiddleWare,getController)
router.get("/ownorganization",authMiddleWare,ownerController)
router.get("/organization/:id",singleOrganizationController)

module.exports = router