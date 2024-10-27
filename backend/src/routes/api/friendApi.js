const express = require("express");
const friendController = require("../../controllers/friendController");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, friendController.getAllFriend);
router.get("/pending", authMiddleware, friendController.getAllPending);
router.post("/add", authMiddleware, friendController.addFriend);
router.post("/accept", authMiddleware, friendController.acceptFriend);
router.delete("/deny", authMiddleware, friendController.denyFriend);
router.delete("/delete", authMiddleware, friendController.deleteFriend);

module.exports = router;