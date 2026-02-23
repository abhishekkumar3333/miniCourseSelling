import { Router } from "express";
import {
  confirmDummyPayment,
  createDummyPayment,
} from "../controller/controller.js";
import { verifyToken } from "../../../core/auth/jwt.js";

const paymentRouter = Router();

paymentRouter.post("/create/:courseId", verifyToken, createDummyPayment);
paymentRouter.post("/confirm", verifyToken, confirmDummyPayment);

export default paymentRouter;
