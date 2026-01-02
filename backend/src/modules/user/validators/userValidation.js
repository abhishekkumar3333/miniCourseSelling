import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  isSubscribed: z.boolean().default(false),
});

export const registerUserValidator = registerUserSchema.safeParse;

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginUserValidator = loginUserSchema.safeParse;
