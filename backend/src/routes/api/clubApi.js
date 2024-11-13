const express = require("express");
const clubController = require("../../controllers/clubController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");
const { upload } = require("../../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, upload.single("avatar"), clubController.create);
router.get("/:id", authMiddleware, clubController.findAllClubByUser);
router.get("/", authMiddleware, clubController.findAllClubByUser);
router.patch("/changeAvatar", authMiddleware, upload.single("avatar"), managerMiddleware, clubController.changeAvatar);
router.patch("/update", authMiddleware, managerMiddleware, clubController.update);
router.delete("/delete", authMiddleware, managerMiddleware, clubController.drop);

module.exports = router; 