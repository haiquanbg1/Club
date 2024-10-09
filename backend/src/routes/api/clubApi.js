const express = require("express");
const clubController = require("../../controllers/clubController");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, clubController.create);
router.get("/", authMiddleware, clubController.findAllClubByUser);

module.exports = router;