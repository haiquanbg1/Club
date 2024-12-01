const express = require("express");
const eventController = require("../../controllers/eventController");
const authMiddleware = require("../../middlewares/authMiddleware");
const managerMiddleware = require("../../middlewares/managerMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, eventController.create);
router.patch("/update", authMiddleware, managerMiddleware, eventController.update);
router.get("/:club_id", authMiddleware, eventController.findAllInClub); // tìm 1 hoặc tất cả event
router.get("/participant/:status/:event_id", authMiddleware, eventController.findAllUserWithKey); // status: 'pending' || 'accepted'
router.post("/participant/add", authMiddleware, managerMiddleware, eventController.addParticipant);
router.delete("/delete", authMiddleware, managerMiddleware, eventController.drop);
router.delete("/participant/kick", authMiddleware, managerMiddleware, eventController.kick);
router.delete("/out", authMiddleware, eventController.outEvent);
router.get("/:status/:club_id", authMiddleware, eventController.findEventByStatus); // tìm event người dùng đã join hoặc chưa join qua status: "joined" || "unjoined"
router.post("/participant/join", authMiddleware, eventController.askToJoin); // request to join event
router.patch("/participant/accept", authMiddleware, managerMiddleware, eventController.acceptPending); // accept request
router.delete("/participant/deny", authMiddleware, managerMiddleware, eventController.denyPending);

module.exports = router;