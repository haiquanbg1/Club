const express = require("express");
const eventController = require("../../controllers/eventController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, eventController.create);
router.patch("/update", authMiddleware, managerMiddleware, eventController.update);
router.get("/:club_id", authMiddleware, eventController.findAllInClub);
router.get("/participant/:event_id", authMiddleware, eventController.findAllUserWithKey);
router.post("/participant/add", authMiddleware, managerMiddleware, eventController.addParticipant);
router.delete("/participant/delete", authMiddleware, managerMiddleware, eventController.drop);
router.delete("/participant/kick", authMiddleware, managerMiddleware, eventController.kick);
router.delete("/out", authMiddleware, eventController.outEvent);

module.exports = router;