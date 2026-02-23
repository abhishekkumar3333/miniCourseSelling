import prisma from "../../../utils/prisma.js";
import { dummyPaymentSchema } from "../validators/validation.js";
import { BadRequestError } from "../../../core/errors/appErrors.js";

export const createDummyPayment = async (req, res) => {
  const { courseId } = req.params;

  // const validation = dummyPaymentSchema.safeParse(req.body);
  // if (!validation.success) {
  //   throw new BadRequestError("Invalid Data");
  // }

  const orderId = "ORD_" + Date.now();
  const transactionId = "TXN_" + Date.now();
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    throw new BadRequestError("Course not found");
  }

  const payment = await prisma.payment.create({
    data: {
      amount: course.price,
      currency: "INR",
      status: "pending",
      paymentMode: "dummy",
      courseId: courseId,
      userId: req.user.id,
      orderId: orderId,
      transactionId: transactionId,
    },
  });
  return res.status(200).json({
    success: true,
    message: "Payment created successfully",
    data: payment,
  });
};

export const confirmDummyPayment = async (req, res) => {
  const { orderId } = req.body;

  const payment = await prisma.payment.findFirst({
    where: {
      orderId: orderId,
    },
  });

  if (!payment) {
    throw new BadRequestError("Payment record not found");
  }

  // Update payment status
  await prisma.payment.update({
    where: { id: payment.id },
    data: { status: "completed" },
  });

  // Create enrollment
  const enrollment = await prisma.enrollment.create({
    data: {
      userId: req.user.id,
      courseId: payment.courseId,
      paymentId: payment.id,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Enrollment successful",
    data: enrollment,
  });
};
