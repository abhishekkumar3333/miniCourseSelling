import nodemailer from "nodemailer";

export const sendMail = async (to, subject, body) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auht: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: body,
  });
};
