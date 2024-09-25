const express = require("express");
const auth = require("./api/authApi");

const router = express.Router();

router.use("/auth", auth)

module.exports = router;