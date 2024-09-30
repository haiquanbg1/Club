const express = require("express");
const auth = require("./api/authApi");
const club = require("./api/clubApi");

const router = express.Router();

router.use("/auth", auth);
router.use("/club", club);

module.exports = router;