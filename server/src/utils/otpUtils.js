import crypto from "crypto";

const otps = new Map();

export const sendOTP = async (email, type) => {
  const otp = crypto.randomInt(100000, 999999).toString();

  otps.set(email, { otp, type, createdAt: Date.now() });

  // Here you should integrate an email service to send the OTP email
  // For example, you can use nodemailer or any other email service provider

  return { success: true, message: `OTP sent to ${email}` };
};

export const validateOTP = (otp) => {
  const email = Array.from(otps.keys()).find(
    (email) => otps.get(email).otp === otp
  );

  if (!email) {
    return;
  }
};
