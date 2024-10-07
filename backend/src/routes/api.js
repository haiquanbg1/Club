const express = require("express");

const auth = require("./api/authApi");
const club = require("./api/clubApi");
const user = require("./api/userApi");
const conversation = require("./api/conversationApi");

const router = express.Router();

router.use("/auth", auth);
router.use("/club", club);
router.use("/user", user);
router.use("./conversation", conversation);

module.exports = router;