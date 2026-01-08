import { OAuth2Client } from "google-auth-library";
import prisma from "../../../utils/prisma.js";
import jwt from "jsonwebtoken";
import { NotFoundError } from "../../../core/errors/appErrors.js";
import bcrypt from "bcrypt";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleLogin = async (req, res) => {
  try {
    const { Idtoken } = req.body;
    if (!Idtoken) {
      return res.status(400).json({ message: "Idtoken is required" });
    }
    const ticket = await client.verifyIdToken({
      idToken: Idtoken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, email_verified, name, sub } = ticket.getPayload();
    if (!email_verified) {
      throw new NotFoundError("Email not verified by Google");
    }
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          isVerified: true,
          provider: "google",
          googleId: sub,
        },
      });
    } else {
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(500).json({ message: "Google Login failed" });
  }
};
