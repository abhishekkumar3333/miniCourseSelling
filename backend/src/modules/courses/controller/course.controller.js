import prisma from "../../../utils/prisma.js";
import { createCourseSchema } from "../validators/course.validation.js";
import { BadRequestError } from "../../../core/errors/appErrors.js";

export const createCourse = async (req, res) => {
  const validation = createCourseSchema.safeParse(req.body);
  if (!validation.success) {
    throw new BadRequestError("Invalid course data");
  }

  const { title, description, price } = validation.data;
  const course = await prisma.course.create({
    data: {
      title,
      description,
      price,
    },
  });

  return res.status(201).json(course);
};

export const getAllCourses = async (req, res) => {
  const courses = await prisma.course.findMany();
  return res.status(200).json({
    message: "Courses retrieved successfully",
    data: courses,
  });
};


