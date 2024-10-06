const express = require("express");
const userController = require("../../controllers/userController");
const authMiddleware = require("../../middlewares/authMiddleware");
const { upload } = require("../../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/changeAvatar", authMiddleware, upload.single('image'), userController.changeAvatar);
router.get("/profile", authMiddleware, userController.findUser);
router.patch("/update", authMiddleware, userController.update);

module.exports = router;