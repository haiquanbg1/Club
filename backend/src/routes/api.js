const express = require("express");
const auth = require("./api/authApi");
const club = require("./api/clubApi");
const user = require("./api/userApi");

const router = express.Router();

router.use("/auth", auth);
router.use("/club", club);
router.use("/user", user);

module.exports = router;