import crypto from "crypto";
import transporter from "./nodemailer";

const otps = new Map();

export const sendOTP = async (email, type) => {
  const otp = crypto.randomInt(100000, 999999).toString();

  otps.set(email, { otp, type, createdAt: Date.now() });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
  };

  // Send the OTP email
  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: `OTP sent to ${email}` };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return { success: false, message: "Failed to send OTP email" };
  }
};

export const validateOTP = (otp) => {
  const email = Array.from(otps.keys()).find(
    (email) => otps.get(email).otp === otp
  );

  if (!email) {
    return { success: false, message: "Invalid OTP" };
  }

  const otpData = otps.get(email);

  if (Date.now() - otpData.createdAt > 10 * 60 * 1000) {
    otps.delete(email);
    return { success: false, message: "OTP expired" };
  }

  return { success: true, message: "OTP validated", email };
};

export const clearOTP = (email) => {
  otps.delete(email);
};
