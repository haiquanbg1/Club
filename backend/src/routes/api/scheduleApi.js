const express = require("express");
const scheduleController = require("../../controllers/scheduleController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, scheduleController.create);
router.patch("/update", authMiddleware, managerMiddleware, scheduleController.update);
router.get("/:event_id", authMiddleware, scheduleController.find);
router.delete("/delete", authMiddleware, managerMiddleware, scheduleController.drop);

module.exports = router;