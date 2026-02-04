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

export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  await prisma.course.delete({
    where: {
      id: id,
    },
  });
  return res.status(200).json({
    message: "Course deleted successfully",
  });
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        modules: true,
        lessions: true,
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


