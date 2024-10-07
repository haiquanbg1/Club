const express = require("express");
const userController = require("../../controllers/userController");
const authMiddleware = require("../../middlewares/authMiddleware");
const adminMiddleware = require("../../middlewares/adminMiddleware");
const { upload } = require("../../middlewares/uploadMiddleware");

const router = express.Router();

// admin
router.delete("/deleteUser", authMiddleware, adminMiddleware, userController.deleteUser);

// user
router.post("/changeAvatar", authMiddleware, upload.single('image'), userController.changeAvatar);
router.get("/profile", authMiddleware, userController.findUser);
router.patch("/update", authMiddleware, userController.update);
router.delete("/delete", authMiddleware, userController.deleteAccount);

module.exports = router;