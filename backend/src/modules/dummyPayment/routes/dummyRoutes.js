import { Router } from "express";
import { createDummyPayment } from "../controller/controller.js";
import { verifyToken } from "../../../core/auth/jwt.js";

const paymentRouter = Router();

paymentRouter.post("/create/:courseId", verifyToken, createDummyPayment);

export default paymentRouter;
