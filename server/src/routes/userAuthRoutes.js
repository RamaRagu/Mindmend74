const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  updatePassword,
  forwardRequestToSupabase,
  sendPasswordRecoveryEmail,
  handlePasswordRecovery,
  validatePasswordRecoveryOTP,
} = require("../controllers/userAuthController");

const router = express.Router();

// Route to Sign Up
router.post("/signup", signUp);

// Route to Sign In
router.post("/signin", signIn);

// Route for Google Sign In
router.post("/google-signin", signIn);

// Route to Sign Out
router.post("/signout", signOut);

// Route to send recovery password email
router.get("/send-password-recovery-email/:email", sendPasswordRecoveryEmail);

// Route to validate OTP
router.post("/validate-otp", validatePasswordRecoveryOTP);

// Route to handle password recovery
router.post("/handle-password-recovery", handlePasswordRecovery);

// Route to update Password
router.put("/update-password", updatePassword);

// Route to forward supabase requests
router.get("/verify", (req, res, next) => {
  console.log("Supabase request route hit");
  forwardRequestToSupabase(req, res, next);
});

module.exports = router;
