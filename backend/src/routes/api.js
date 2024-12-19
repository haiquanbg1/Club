const express = require("express");

const auth = require("./api/authApi");
const club = require("./api/clubApi");
const user = require("./api/userApi");
const conversation = require("./api/conversationApi");
const member = require("./api/memberApi");
const friend = require("./api/friendApi");
const event = require("./api/eventApi");
const notification = require("./api/notificationApi");
const report = require("./api/reportApi");
const message = require("./api/messageApi");
const schedule = require("./api/scheduleApi");
const role = require("./api/roleApi");

const router = express.Router();

router.use("/auth", auth);
router.use("/club", club);
router.use("/user", user);
router.use("/event", event);
router.use("/conversation", conversation);
router.use("/member", member);
router.use("/friend", friend);
router.use("/event", event);
router.use("/notification", notification);
router.use("/report", report);
router.use("/message", message);
router.use("/schedule", schedule);
router.use("/role", role);

module.exports = router;