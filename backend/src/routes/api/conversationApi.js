const express = require("express");
const conversationController = require("../../controllers/conversationController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, managerMiddleware, conversationController.create);

module.exports = router;