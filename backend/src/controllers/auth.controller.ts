import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

type PasswordResetJwtPayload = {
  userId: number;
  email: string;
  type: "password-reset";
};

const PASSWORD_RESET_TOKEN_EXPIRATION = "15m";

const getJwtSecret = (): string | null => {
  return process.env.JWT_SECRET ?? null;
};

const getPasswordResetSecret = (): string | null => {
  return process.env.PASSWORD_RESET_JWT_SECRET ?? getJwtSecret();
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Register Failed", error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const jwtSecret = getJwtSecret();

    if (!jwtSecret) {
      return res.status(500).json({ message: "JWT secret is not configured" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      jwtSecret,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Login Failed" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body as { email?: string };

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const passwordResetSecret = getPasswordResetSecret();

    if (!passwordResetSecret) {
      return res
        .status(500)
        .json({ message: "Password reset secret is not configured" });
    }

    const clientUrl = process.env.CLIENT_URL;

    if (!clientUrl) {
      return res.status(500).json({ message: "CLIENT_URL is not configured" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(200).json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    const resetToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        type: "password-reset",
      },
      passwordResetSecret,
      { expiresIn: PASSWORD_RESET_TOKEN_EXPIRATION },
    );

    const resetLink = `${clientUrl}/reset-password?token=${resetToken}`;

    return res.status(200).json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
      ...(process.env.NODE_ENV !== "production" ? { resetLink } : {}),
    });
  } catch {
    return res.status(500).json({ message: "Failed to process forgot password request" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body as {
      token?: string;
      newPassword?: string;
    };

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and newPassword are required" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "newPassword must be at least 8 characters long" });
    }

    const passwordResetSecret = getPasswordResetSecret();

    if (!passwordResetSecret) {
      return res
        .status(500)
        .json({ message: "Password reset secret is not configured" });
    }

    let decoded: PasswordResetJwtPayload;

    try {
      decoded = jwt.verify(token, passwordResetSecret) as PasswordResetJwtPayload;
    } catch {
      return res.status(401).json({ message: "Invalid or expired reset token" });
    }

    if (decoded.type !== "password-reset") {
      return res.status(401).json({ message: "Invalid reset token type" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: decoded.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(200).json({ message: "Password reset successful" });
  } catch {
    return res.status(500).json({ message: "Failed to reset password" });
  }
};
