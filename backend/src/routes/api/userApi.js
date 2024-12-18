const express = require("express");
const userController = require("../../controllers/userController");
const authMiddleware = require("../../middlewares/authMiddleware");
const { upload } = require("../../middlewares/uploadMiddleware");
const router = express.Router();

// user
router.patch("/changeAvatar", authMiddleware, upload.single('image'), userController.changeAvatar);
router.get("/profile", authMiddleware, userController.findUser);
router.patch("/update", authMiddleware, userController.update);
router.delete("/delete", authMiddleware, userController.deleteAccount);
router.patch("/changePassword", authMiddleware, userController.changePassword);
router.get("/findToAdd", authMiddleware, userController.getUserStartWith);

module.exports = router;
