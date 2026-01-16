import { z } from "zod";

export const createModuleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export const createModuleValidator = createModuleSchema;
