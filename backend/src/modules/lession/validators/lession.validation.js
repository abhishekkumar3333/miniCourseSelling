import { z } from "zod";

const createLessionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  topic: z.string().min(1, "Topic is required"),
  duration: z.coerce
    .number()
    .min(1, "Duration must be at least 1 minute")
    .optional(),
});

export const createLessionValidator = createLessionSchema;
