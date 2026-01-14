import prisma from "../../../utils/prisma.js";
import { generateToken } from "../../../core/auth/jwt.js";
import bcrypt from "bcrypt";
import { sendMail } from "../../../utils/sendMails.js";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/userValidation.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../../../core/errors/appErrors.js";

export const registerUser = async (req, res) => {
  const validation = registerUserValidator(req.body);
  console.log(validation);
  if (!validation.success) {
    throw new UnauthorizedError("Invalid data");
  }

  const { name, email, password, isSubscribed } = validation.data;
  console.log(validation.data);
  const ExistingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (ExistingUser) {
    throw new BadRequestError("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      emailOtp: otp,
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
      password: hashedPassword,
      IsSubscribed: isSubscribed,
    },
  });
  await sendMail(
    email,
    "Welcome to Our Service",
    `Hello ${name},\n\nThank you for registering at our service! your OTP is ${otp}. We're excited to have you on board.\n\nBest regards, The Team`
  );
  res.status(201).json({
    message: "User registered successfully",
    user: newUser,
  });
};

export const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  if (user.isVerified === true) {
    throw new BadRequestError("Email already verified");
  }
  if (user.emailOtp !== otp) {
    throw new BadRequestError("Invalid OTP");
  }
  if (user.otpExpiry < new Date()) {
    throw new BadRequestError("OTP expired");
  }
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      isVerified: true,
      emailOtp: null,
      otpExpiry: null,
    },
  });
  res.status(200).json({
    message: "Email verified successfully",
  });
};

export const loginUser = async (req, res) => {
  const validation = loginUserValidator(req.body);
  if (!validation.success) {
    throw new UnauthorizedError("Invalid data");
  }
  const { email, password } = validation.data;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new NotFoundError("User not found");
  }
  if (!user.isVerified) {
    throw new UnauthorizedError("Email not verified");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid password");
  }
  const token = generateToken(user.id);
  res.status(200).json({
    token,
  });
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      resetOtp: resetOtp,
      resetOtpExpiry: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  await sendMail(
    email,
    "Password Reset Request",
    `Hello ${user.name},\n\nYou have requested to reset your password. Your OTP for password reset is ${resetOtp}. This OTP is valid for 10 minutes.\n\nIf you did not request this, please ignore this email.\n\nBest regards,`
  );
  res.status(200).json({
    message: "Password reset OTP sent to your email",
  });
};

// export const resetPassword = async (req, res) => {
//   const { email, resetOtp, otp, newPassword } = req.body;
//   const otpCode = resetOtp || otp;
//   const user = await prisma.user.findUnique({
//     where: {
//       email: email,
//     },
//   });
//   console.log(user);
//   if (!user) {
//     throw new NotFoundError("User not found");
//   }
//   if (
//     (user.resetOtp?.toString().trim() || "") !==
//     (otpCode?.toString().trim() || "")
//   ) {
//     throw new BadRequestError("Invalid OTP");
//   }
//   if (user.resetOtpExpiry < new Date()) {
//     throw new BadRequestError("OTP expired");
//   }
//   const hashedPassword = await bcrypt.hash(newPassword, 10);
//   console.log(hashedPassword);
//   await prisma.user.update({
//     where: {
//       email: email,
//     },
//     data: {
//       password: hashedPassword,
//       resetOtp: null,
//       resetOtpExpiry: null,
//     },
//   });
//   res.status(200).json({
//     message: "Password reset successfully",
//   });
// };

export const resetPassword = async (req, res) => {
  const { email, resetOtp, newPassword } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log(user);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  if (user.resetOtp !== resetOtp) {
    throw new BadRequestError("Invalid OTP");
  }
  if (user.resetOtpExpiry < new Date()) {
    throw new BadRequestError("OTP expired");
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      password: hashedPassword,
      resetOtp: null,
      resetOtpExpiry: null,
    },
  });
  res.status(200).json({
    message: "Password reset successfully",
  });
};

export const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json({
    message: "Users fetched successfully",
    users,
  });
};

export const deleteUSer = async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    message: "User deleted successfully",
  });
};

export const getMyProfile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });
  res.status(200).json({
    message: "User fetched successfully",
    user,
  });
};
