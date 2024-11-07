const express = require("express");
const reportController = require("../../controllers/reportController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");

const router = express.Router();



module.exports = router;