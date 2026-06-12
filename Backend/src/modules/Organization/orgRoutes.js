const express = require("express")
const {createController,getController,ownerController,singleOrganizationController,addMemberController} = require("./orgController.js")
const authMiddleWare = require("../Authentication/authmiddleware.js")

const router = express.Router()

router.post("/create",authMiddleWare,createController)
router.get("/getorganization",authMiddleWare,getController)
router.get("/ownorganization",authMiddleWare,ownerController)
router.get("/:id",singleOrganizationController)
router.post("/:id/addMember",authMiddleWare,addMemberController)

module.exports = router