const express = require("express");
const memberController = require("../../controllers/memberController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, managerMiddleware, memberController.addMember);
router.delete("/delete", authMiddleware, managerMiddleware, memberController.deleteMember);
router.delete("/out", authMiddleware, memberController.deleteMember);
router.get("/",)

module.exports = router;