const { supabase } = require("../utils/supabaseClient.js");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Sign up a new user
 */
const signUp = async (req, res) => {
  let {
    email,
    password,
    role,
    phone,
    fullName,
    licenseNumber,
    specialization,
    yearsOfExperience,
    children,
    availability,
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email or password are required." });
  }

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required for sign-up." });
    }

    // Check if user already exists in database
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!role) {
      return res.status(400).json({ message: "Role is required." });
    }

    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    let loginType = "EMAIL";

    // Hash the password
    let hashedPassword;
    hashedPassword = await bcrypt.hash(password, 10);

    // Use Prisma transaction to ensure atomicity
    const newUser = await prisma.$transaction(async (tx) => {
      // Create the base user
      const user = await tx.user.create({
        data: {
          email: email,
          password: hashedPassword,
          role: role || "PARENT",
          name: fullName,
          phone: phone,
        },
      });

      // Based on role, create the appropriate related record
      if (role === "PARENT") {
        await tx.parent.create({
          data: {
            userId: user.id,
            children: {
              create: children,
            },
          },
        });
      }

      if (role === "DOCTOR") {
        await tx.doctor.create({
          data: {
            userId: user.id,
            licenseNumber: licenseNumber,
            specialization: specialization,
            yearsOfExperience: yearsOfExperience,
            availableSlots: availability,
          },
        });
      }

      return user;
    });

    res.status(201).json({
      message: "User signed up successfully",
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
const signIn = async (req, res) => {
  let { email, password, firebaseToken } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email or password are required." });
  }

  try {
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
const signOut = async (req, res) => {
  try {
    res.status(200).json({ message: "User signed out successfully." });
  } catch (error) {
    console.error("Error signing out user:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Update password
 */
const updatePassword = async (req, res) => {
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
const sendPasswordRecoveryEmail = async (req, res) => {
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
      return res.status(400).json({
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
const validatePasswordRecoveryOTP = async (req, res) => {
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
const handlePasswordRecovery = async (req, res) => {
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

module.exports = {
  signUp,
  signIn,
  signOut,
  updatePassword,
  sendPasswordRecoveryEmail,
  handlePasswordRecovery,
  validatePasswordRecoveryOTP,
};
