const express = require("express");
const clubController = require("../../controllers/clubController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");
const { upload } = require("../../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, upload.single("avatar"), clubController.create);
router.get("/", authMiddleware, clubController.findAllClubByUser);
router.patch("/changeAvatar", authMiddleware, managerMiddleware, upload.single("avatar"), clubController.changeAvatar);
router.patch("/update", authMiddleware, managerMiddleware, clubController.update);

module.exports = router;