const express = require("express");
const friendController = require("../../controllers/friendController");
const directMessageController = require('../../controllers/directMesController');
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, friendController.getFriendStartWith);
router.get("/pending", authMiddleware, friendController.getAllPending);
router.post("/add", authMiddleware, friendController.addFriend);
router.post("/accept", authMiddleware, friendController.acceptFriend);
router.delete("/deny", authMiddleware, friendController.denyFriend);
router.delete("/delete", authMiddleware, friendController.deleteFriend);
router.post("/:friend_id/send", authMiddleware, directMessageController.create);
router.delete('/:friend_id/:message_id', authMiddleware, directMessageController.drop);
router.get("/:friend_id/old", authMiddleware, directMessageController.getOldMessages);
router.get("/:friend_id/new", authMiddleware, directMessageController.getNewMessages);

module.exports = router;