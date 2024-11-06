const express = require("express");
const eventController = require("../../controllers/eventController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, eventController.create);
router.patch("/update", authMiddleware, managerMiddleware, eventController.update);

module.exports = router;