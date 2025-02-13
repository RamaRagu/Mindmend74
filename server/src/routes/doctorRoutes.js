const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const {
  authenticateToken,
  authorizeDoctor,
} = require("../middlewares/authMiddleware");

// Doctor routes
router.get(
  "/details",
  authenticateToken,
  authorizeDoctor,
  doctorController.getDoctorDetails
);
router.put(
  "/update",
  authenticateToken,
  authorizeDoctor,
  doctorController.updateDoctor
);
router.delete(
  "/delete",
  authenticateToken,
  authorizeDoctor,
  doctorController.deleteDoctor
);

module.exports = router;
