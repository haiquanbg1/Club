const express = require("express");
const notificationController = require("../../controllers/notificationController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");

const router = express.Router();

router.get("/club:club_id", authMiddleware, notificationController.findAllByClub);
router.delete("/delete", authMiddleware, managerMiddleware, notificationController.drop);
router.post("/create", authMiddleware, managerMiddleware, notificationController.create);
router.get("/:notification", authMiddleware, notificationController.findOne);

module.exports = router;