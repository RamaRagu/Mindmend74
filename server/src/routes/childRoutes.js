const express = require("express");
const router = express.Router();
const childController = require("../controllers/childController.js");

// Child routes
router.post("/", childController.createChild);
router.get("/:id", childController.getChildById);
router.put("/:id", childController.updateChildById);
router.delete("/:id", childController.deleteChildById);
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Child routes are working!" });
});

module.exports = router;
