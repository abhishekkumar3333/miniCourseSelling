import prisma from "../../../lib/prisma.js";
import { createCourseSchema } from "../validators/course.validation.js";

export const createCourse = async (req, res) => {
  const validation = createCourseSchema.safeParse(req.body);
  
};
