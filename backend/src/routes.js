import express from "express";
import userRouter from "./modules/user/routes/userRoutes.js";
import googleRouter from "./modules/google/routes/google.routes.js";
const router = express.Router();
router.use("/api/v1/user", userRouter);
router.use("/api/v1/google", googleRouter);
export default router;
