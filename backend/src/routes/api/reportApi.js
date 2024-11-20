const express = require("express");
const reportController = require("../../controllers/reportController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, reportController.create);
router.patch("/update", authMiddleware, reportController.update);
router.get("/:club_id", authMiddleware, managerMiddleware, reportController.findAll);
router.delete("/delete", authMiddleware, reportController.drop);

module.exports = router;