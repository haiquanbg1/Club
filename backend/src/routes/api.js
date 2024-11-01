const express = require("express");

const auth = require("./api/authApi");
const club = require("./api/clubApi");
const user = require("./api/userApi");
const conversation = require("./api/conversationApi");
const member = require("./api/memberApi");
const friend = require("./api/friendApi");

const router = express.Router();

router.use("/auth", auth);
router.use("/club", club);
router.use("/user", user);
router.use("/conversation", conversation);
router.use("/member", member);
router.use("/friend", friend);

module.exports = router;