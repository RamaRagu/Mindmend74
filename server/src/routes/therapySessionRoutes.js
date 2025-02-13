const express = require("express");
const router = express.Router();
const therapySessionController = require("../controllers/therapySessionController");
const {
  authenticateToken,
  authorizeParent,
  authorizeDoctor,
} = require("../middlewares/authMiddleware");

// Therapy session routes
router.post(
  "/",
  authenticateToken,
  authorizeParent,
  therapySessionController.createSession
);
router.get(
  "/:id",
  authenticateToken,
  authorizeParent,
  therapySessionController.getSessionById
);
router.put(
  "/:id",
  authenticateToken,
  authorizeParent,
  therapySessionController.updateSessionById
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeParent,
  therapySessionController.deleteSessionById
);
router.get(
  "/doctor/sessions",
  authenticateToken,
  authorizeDoctor,
  therapySessionController.getDoctorSessions
);

module.exports = router;
