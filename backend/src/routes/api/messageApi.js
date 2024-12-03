const express = require("express");
const messageController = require("../../controllers/messageController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");
const directMessageController = require('../../controllers/directMesController');

const router = express.Router();


router.get("/:conversation_id", authMiddleware, messageController.findAllByConversation);
router.post("/create", authMiddleware, messageController.create);
router.delete("/delete", authMiddleware, messageController.drop);
router.post("/:friend_id/send", authMiddleware, directMessageController.create);
router.delete('/:friend_id/:message_id', authMiddleware, directMessageController.drop);
router.get("/:friend_id/old", authMiddleware, directMessageController.getOldMessages);


module.exports = router;