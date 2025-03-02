const express = require("express");
const router = express.Router();
const childController = require("../controllers/childController.js");

// Create a new child
router.post("/", childController.createChild);

// Get a specific child's information
router.get("/:id", childController.getChildById);

// Update a child's information
router.put("/:id", childController.updateChildById);

// Delete a child account
router.delete("/:id", childController.deleteChildById);

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Child routes are working!" });
});

module.exports = router;
