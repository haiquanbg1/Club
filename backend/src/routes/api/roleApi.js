const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");
const roleController = require("../../controllers/roleController");
const router = express.Router();

router.post("/add", authMiddleware, managerMiddleware, roleController.addManager);

module.exports = router;
