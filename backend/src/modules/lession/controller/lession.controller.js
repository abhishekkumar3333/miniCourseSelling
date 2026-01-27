import prisma from "../../../utils/prisma.js";
import { createLessionValidator } from "../validators/lession.validation.js";
import { BadRequestError } from "../../../core/errors/appErrors.js";

export const createLession = async (req, res) => {
  const validationResult = createLessionValidator.safeParse(req.body);
  if (!validationResult.success) {
    throw new BadRequestError("invalid request data");
  }
  const { courseId } = req.params;
  const { title, description, topic, duration } = validationResult.data;

  if (!topic || !description) {
    throw new BadRequestError("Topic and Description are required");
  }

  const newLession = await prisma.lession.create({
    data: {
      title,
      description,
      topic,
      duration,
      courseId,
    },
  });
  res.status(201).json({
    message: "Lession created successfully",
    data: newLession,
  });
};
