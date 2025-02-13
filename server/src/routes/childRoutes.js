const express = require("express");
const router = express.Router();
const childController = require("../controllers/childController");
const {
  authenticateToken,
  authorizeParent,
} = require("../middlewares/authMiddleware");

// Child routes
router.post(
  "/",
  authenticateToken,
  authorizeParent,
  childController.createChild
);
router.get(
  "/:id",
  authenticateToken,
  authorizeParent,
  childController.getChildById
);
router.put(
  "/:id",
  authenticateToken,
  authorizeParent,
  childController.updateChildById
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeParent,
  childController.deleteChildById
);

module.exports = router;
