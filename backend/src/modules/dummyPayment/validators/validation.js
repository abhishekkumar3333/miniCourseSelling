import { z } from "zod";

export const dummyPaymentSchema = z.object({
  amount: z.number().optional(),
  currency: z.enum(["INR"]).optional(),
  status: z.enum(["pending", "completed", "failed"]).optional(),
  paymentMode: z.string().optional(),
  orderId: z.string().optional(),
});

export const createDummyPaymentValidator = dummyPaymentSchema;
