import prisma from "../../../utils/prisma.js";
import { generateToken } from "../../../core/auth/jwt.js";
import bcrypt from "bcrypt";
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
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      IsSubscribed: isSubscribed,
    },
  });
  res.status(201).json({
    message: "User registered successfully",
    user: newUser,
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
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedError("Invalid password");
  }
  const token = generateToken(user.id);
  res.status(200).json({
    token,
  });
};
