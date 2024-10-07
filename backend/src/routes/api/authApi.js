const express = require("express");

const authController = require("../../controllers/authController");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.delete("/logout", authMiddleware, authController.logout);
router.post("/sendOtp", authController.sendOTP);
router.post("/verifyOtp", authController.verifyOTP);
router.post("/verify-turnstile", authController.verifyCapcha);
router.put("/refresh-token", authController.refreshToken);

module.exports = router;