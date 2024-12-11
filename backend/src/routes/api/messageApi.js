const express = require("express");
const messageController = require("../../controllers/messageController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");
const directMessageController = require('../../controllers/directMesController');

const router = express.Router();


router.post("/create", authMiddleware, messageController.create);
router.delete("/delete", authMiddleware, messageController.drop);
router.patch("/changeStatusMessage", authMiddleware, messageController.changeStatus);
router.get("/react", authMiddleware, messageController.findAllReactInMessage);
router.post("/createReact", authMiddleware, messageController.createReact);
router.get("/club/:conversation_id", authMiddleware, messageController.findAllByConversation);

router.post("/friend/:friend_id/send", authMiddleware, directMessageController.create);
router.delete('/friend/delete/', authMiddleware, directMessageController.drop);
router.get("/friend/:friend_id/old", authMiddleware, directMessageController.getOldMessages);
router.patch("/friend/changeReact", authMiddleware, directMessageController.reactChange);
router.patch("/friend/changeStatusMessage", authMiddleware, directMessageController.changeStatus);


module.exports = router;