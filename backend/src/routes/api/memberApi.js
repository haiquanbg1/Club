const express = require("express");
const memberController = require("../../controllers/memberController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, managerMiddleware, memberController.addMember);
router.delete("/delete", authMiddleware, managerMiddleware, memberController.deleteMember);
router.delete("/out", authMiddleware, memberController.outMember);
router.get("/:club_id", authMiddleware, memberController.findUserInClub);
router.get("/add/:club_id", authMiddleware, managerMiddleware, memberController.listToAddMember);

module.exports = router;