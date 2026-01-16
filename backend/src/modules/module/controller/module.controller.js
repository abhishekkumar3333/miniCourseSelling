import prisma from "../../../utils/prisma.js";
import { createModuleValidator } from "../validators/module.validation.js";

export const createModule = async (req, res) => {
  const validationResult = createModuleValidator.safeParse(req.body);
  console.log("Validation Result:", validationResult);
  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.error.errors });
  }
  const { courseId } = req.params;
  console.log("Course ID:", courseId);
  const { title, content } = validationResult.data;

  const module = await prisma.module.create({
    data: {
      title,
      content,
      courseId,
    },
  });
  console.log("Created Module:", module);
  res.status(201).json({
    message: "Module created successfully",
    module,
  });
};
