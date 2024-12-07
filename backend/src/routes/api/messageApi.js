const express = require("express");
const messageController = require("../../controllers/messageController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");
const directMessageController = require('../../controllers/directMesController');

const router = express.Router();


router.get("/:conversation_id", authMiddleware, messageController.findAllByConversation);
router.post("/create", authMiddleware, messageController.create);
router.delete("/delete", authMiddleware, messageController.drop);
router.patch("/group/changeReact", authMiddleware, directMessageController.reactChange);

router.post("/:friend_id/send", authMiddleware, directMessageController.create);
router.delete('/friend/delete/', authMiddleware, directMessageController.drop);
router.get("/:friend_id/old", authMiddleware, directMessageController.getOldMessages);
router.patch("/friend/changeReact", authMiddleware, directMessageController.reactChange);
router.patch("/friend/changeStatusMessage", authMiddleware, directMessageController.changeStatus);


module.exports = router;