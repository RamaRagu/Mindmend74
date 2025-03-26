const express = require("express");
const router = express.Router();
const parentController = require("../controllers/parentController.js");

// Child routes
router.post("/", parentController.createParent);
router.get("/:id", parentController.getParentDetails);
router.put("/:id", parentController.updateParent);
router.delete("/:id", parentController.deleteParent);

module.exports = router;
