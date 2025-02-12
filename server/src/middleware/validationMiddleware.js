const { body, validationResult } = require("express-validator");

// Validation for parent registration
const validateParentRegistration = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("name").not().isEmpty().withMessage("Name is required"),
  body("contact").not().isEmpty().withMessage("Contact is required"),
  body("address").not().isEmpty().withMessage("Address is required"),
  body("userType").isIn(["PARENT", "DOCTOR"]).withMessage("Invalid user type"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateParentRegistration };
