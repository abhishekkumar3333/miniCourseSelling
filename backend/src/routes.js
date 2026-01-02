import express from "express";
import userRouter from "./modules/user/routes/userRoutes.js";
const router = express.Router();
router.use("api/v1/user", userRouter);
export default router;
