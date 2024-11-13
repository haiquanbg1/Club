const express = require("express");
const conversationController = require("../../controllers/conversationController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, managerMiddleware, conversationController.create);
router.patch("/update", authMiddleware, managerMiddleware, conversationController.update);
router.delete("/delete", authMiddleware, managerMiddleware, conversationController.drop);
router.get("/:club_id", authMiddleware, conversationController.findAllInClub);
router.get("/participant/:conversation_id", authMiddleware, conversationController.findAllUserWithKey);
router.post("/participant/add", authMiddleware, managerMiddleware, conversationController.addParticipant);
router.delete("/participant/kick", authMiddleware, managerMiddleware, conversationController.kick);
router.delete("/out", authMiddleware, conversationController.outConversation);

module.exports = router;