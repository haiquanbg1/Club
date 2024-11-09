const express = require("express");
const messageController = require("../../controllers/messageController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");

const router = express.Router();

router.get("/:conversation_id", authMiddleware, messageController.findAllByConversation);
router.post("/create", authMiddleware, messageController.create);
router.delete("/delete", authMiddleware, messageController.drop);

module.exports = router;