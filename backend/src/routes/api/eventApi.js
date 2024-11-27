const express = require("express");
const eventController = require("../../controllers/eventController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, eventController.create);
router.patch("/update", authMiddleware, managerMiddleware, eventController.update);
router.get("/:status/:club_id", authMiddleware, eventController.findAllInClub); // status: 'pending' || 'accepted'
router.get("/participant/:status/:event_id", authMiddleware, eventController.findAllUserWithKey);
router.post("/participant/add", authMiddleware, managerMiddleware, eventController.addParticipant);
router.delete("/participant/delete", authMiddleware, managerMiddleware, eventController.drop);
router.delete("/participant/kick", authMiddleware, managerMiddleware, eventController.kick);
router.delete("/out", authMiddleware, eventController.outEvent);
router.get("/:status/:club_id", authMiddleware, eventController.findEventUserJoined) // status: 'joined' || 'unjoined'
router.post("/participant/join", authMiddleware, eventController.askToJoin);
router.patch("/participant/accept", authMiddleware, managerMiddleware, eventController.acceptPending);

module.exports = router;