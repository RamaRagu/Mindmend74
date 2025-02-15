const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");

// Doctor routes
router.get("/details", doctorController.getDoctorDetails);
router.put("/update", doctorController.updateDoctor);
router.delete("/delete", doctorController.deleteDoctor);

module.exports = router;
