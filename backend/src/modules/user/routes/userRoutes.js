import express from "express";
import {
  forgetPassword,
  loginUser,
  registerUser,
  verifyEmailOtp,
} from "../controller/userController.js";
const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/verify-email-otp", verifyEmailOtp);
userRouter.post("/forget-password", forgetPassword);
export default userRouter;
