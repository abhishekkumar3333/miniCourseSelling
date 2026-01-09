import { z } from "zod";

export const createCourseSchema = z.object({
  title: z
    .string("Title must be a string")
    .min(5, "Title must be at least 5 characters long"),
  description: z
    .string("Description must be a string")
    .min(20, "Description must be at least 20 characters long"),
  price: z.number("Price must be a number").min(0, "Price must be at least 0"),
  published: z.boolean("Published must be a boolean").optional(),
});

export const createCourseValidator = createCourseSchema.safeParse;

