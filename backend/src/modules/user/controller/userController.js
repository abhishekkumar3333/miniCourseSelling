import prisma from "../../../utils/prisma.js";
import {generateToken}from "../../../core/auth/jwt.js";
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
  if (!validation) {
    throw new UnauthorizedError("Invalid data");
  }

  const { name, email, password, isSubscribed } = req.body;

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
      isSubscribed,
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
  const { eamil, password } = validation.data;
  const user = await prisma.user.findUnique({
    where: {
      email: eamil,
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
    message: "User logged in successfully",
    user,
    token,
  });
};
