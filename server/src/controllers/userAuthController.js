import { supabase } from "../utils/supabaseClient.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { verifyFirebaseToken } from "../utils/firebaseAdmin.js";
import { sendOTP, validateOTP, clearOTP } from "../utils/otpUtils.js";
import crypto from "crypto";
import e from "express";

const prisma = new PrismaClient();

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Sign up a new user
 */
export const signUp = async (req, res) => {
  let {
    username,
    email,
    password,
    role,
    firebaseToken,
    phone,
    fullName,
    medicalLicenseNumber,
    specialization,
    yearsOfExperience,
    children,
  } = req.body;

  if ((!email || !password) && !firebaseToken) {
    return res
      .status(400)
      .json({ message: "Email and password or Firebase token are required." });
  }

  if (!username || username.length < 4 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    return res
      .status(400)
      .json({
        message:
          "Invalid username. Username must be at least 4 characters long and contain only alphanumeric characters and underscores.",
      });
  }

  try {
    if (firebaseToken) {
      const decodedToken = await verifyFirebaseToken(firebaseToken);
      const { uid, email: firebaseEmail, name } = decodedToken;

      if (!firebaseEmail) {
        return res
          .status(400)
          .json({ message: "Invalid Firebase token: email not found." });
      }

      // Check if the user already exists in the database
      const findUser = await prisma.user.findUnique({
        where: {
          email: firebaseEmail,
        },
      });

      if (findUser) {
        return res.status(400).json({ message: "User already exists." });
      }

      password = uid;
      fullName = name;
      email = firebaseEmail;
    }

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required for sign-up." });
    }

    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ message: "Password does not meet the validation criteria." });
    }

    // Check if user already exists in database
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    let loginType = "EMAIL";

    // Hash the password
    let hashedPassword;
    if (!firebaseToken) {
      hashedPassword = await bcrypt.hash(password, 10);
    } else {
      hashedPassword = password;
      loginType = "GOOGLE";
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const newUser = await prisma.user.create({
      data: {
        id: data.user.id,
        email: email,
        password: hashedPassword,
        role: role || "PARENT",
        name: fullName,
        phone: phone,
        loginType: loginType,
      },
    });

    if (role === "PARENT") {
      await prisma.parent.create({
        data: {
          userId: newUser.id,
          children: {
            create: children,
          },
        },
      });
    }

    if (role === "DOCTOR") {
      await prisma.doctor.create({
        data: {
          userId: newUser.id,
          specialization: specialization,
          licenseNumber: medicalLicenseNumber,
          yearsOfExperience: yearsOfExperience,
        },
      });
    }

    res.status(201).json({
      message: "User signed up successfully",
      supabaseUser: data,
      prismaUser: newUser,
    });
  } catch (error) {
    console.error("Error signing up user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Sign in a user
 */
export const signIn = async (req, res) => {
  let { email, password, firebaseToken } = req.body;

  if ((!email || !password) && !firebaseToken) {
    return res
      .status(400)
      .json({ message: "Email and password or Firebase token are required." });
  }

  try {
    if (firebaseToken) {
      const decodedToken = await verifyFirebaseToken(firebaseToken);
      const { uid, email: firebaseEmail } = decodedToken;

      if (!firebaseEmail) {
        return res
          .status(400)
          .json({ message: "Invalid Firebase token: email not found." });
      }

      email = firebaseEmail;
      password = uid;

      // Check if the user already exists in the database
      const findUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      // If the user does not exist, redirect to sign-up
      if (!findUser) {
        return signUp(req, res);
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const userDetails = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userDetails) {
      return res
        .status(404)
        .json({ message: "User details not found in the database." });
    }

    // Set the access token and refresh token as cookies
    res.cookie("accessToken", data.session.access_token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.cookie("refreshToken", data.session.refresh_token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      message: "User signed in successfully.",
      user: {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
      },
    });
  } catch (error) {
    console.error("Error signing in user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Sign out a user
 */
export const signOut = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Clear the access token and refresh token cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "User signed out successfully." });
  } catch (error) {
    console.error("Error signing out user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Update password
 */
export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { user } = req;

  if (!currentPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "Old password and new password are required." });
  }

  if (!validatePassword(newPassword)) {
    return res
      .status(400)
      .json({ message: "New password does not meet the validation criteria." });
  }

  try {
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const userDetails = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!userDetails) {
      return res
        .status(404)
        .json({ message: "User details not found in the database." });
    }

    if (userDetails.loginType === "GOOGLE") {
      return res
        .status(400)
        .json({ message: "Cannot update password for Google sign-in users." });
    }

    const isValidPassword = await bcrypt.compare(
      currentPassword,
      userDetails.password
    );

    if (!isValidPassword) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in Supabase
    const { error: supabaseError } = await supabase.auth.updateUser({
      email: user.email,
      password: newPassword,
    });

    if (supabaseError) {
      console.log("Error updating password in Supabase:", supabaseError);
      return res.status(400).json({ message: supabaseError.message });
    }

    // Update password in Prisma
    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Password Recovery email
 */
export const sendPasswordRecoveryEmail = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userDetails) {
      return res.status(404).json({ message: "User not found." });
    }

    if (userDetails.loginType === "GOOGLE") {
      return res
        .status(400)
        .json({
          message:
            "Cannot send password recovery email for Google sign-in users.",
        });
    }

    const result = await sendOTP(email, "recovery");

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    } else {
      return res.status(200).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error sending password recovery email:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Validate OTP
 */
export const validatePasswordRecoveryOTP = async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    return res.status(400).json({ message: "OTP is required." });
  }

  try {
    const result = validateOTP(otp.toString());

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    } else {
      return res.status(200).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error validating password recovery OTP:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Handle password recovery
 */
export const handlePasswordRecovery = async (req, res) => {
  const { otp, newPassword } = req.body;

  if (!otp || !newPassword) {
    return res
      .status(400)
      .json({ message: "Access token, OTP, and new password are required." });
  }

  if (!validatePassword(newPassword)) {
    return res
      .status(400)
      .json({ message: "New password does not meet the validation criteria." });
  }

  try {
    const otpValidationResult = validateOTP(otp);

    if (!otpValidationResult.success) {
      return res.status(400).json({ message: otpValidationResult.message });
    }

    console.log("Email", otpValidationResult.email);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const userDetails = await prisma.user.findUnique({
      where: {
        email: otpValidationResult.email,
      },
    });

    const { data, error } = await supabase.auth.admin.updateUserById(
      userDetails.id,
      {
        password: newPassword,
      }
    );

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: otpValidationResult.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    clearOTP(otpValidationResult.email);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "Password recovery successful." });
  } catch (error) {
    console.error("Error recovering password:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Forward request to Supabase
 */
export const forwardRequestToSupabase = async (req, res) => {
  const { token, type, redirect_to } = req.query;

  if (!token || !type || !redirect_to) {
    return res
      .status(400)
      .json({ message: "Missing required query parameters." });
  }

  try {
    const response = await fetch(
      `https://supabase.mysuuq.net/auth/v1/verify?token=${token}&type=${type}&redirect_to=${redirect_to}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "Error verifying token with Supabase." });
    }

    return res.status(200).json({ message: "Token verified successfully." });
  } catch (error) {
    console.error("Error forwarding request to Supabase:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
