const express = require("express");
const router = express.Router();
const therapySessionController = require("../controllers/therapySessionController");

// Therapy session routes
router.post("/", therapySessionController.createSession);
router.get("/:id", therapySessionController.getSessionById);
router.put("/:id", therapySessionController.updateSessionById);
router.delete("/:id", therapySessionController.deleteSessionById);
router.get("/doctor/sessions", therapySessionController.getDoctorSessions);

module.exports = router;
