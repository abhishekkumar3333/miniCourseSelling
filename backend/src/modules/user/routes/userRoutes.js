import express from "express";
import {
  deleteUSer,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  loginUser,
  registerUser,
  resetPassword,
  verifyEmailOtp,
  sendTestNotification,
} from "../controller/userController.js";
import { verifyToken } from "../../../core/auth/jwt.js";
const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/verify-email-otp", verifyEmailOtp);
userRouter.post("/forget-password", forgetPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/all-users", getAllUsers);
userRouter.delete("/delete-user/:id", deleteUSer);
userRouter.get("/get-user-profile", verifyToken, getMyProfile);
userRouter.post("/send-notification", sendTestNotification);
export default userRouter;
