import type { Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";

type JwtUserPayload = {
  userId: number;
  email: string;
};

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtUserPayload | undefined;
  }
}

export type AuthRequest = Request & {
  user?: JwtUserPayload | undefined;
  cookies: {
    accessToken?: string | undefined;
  };
};

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.accessToken;

  let token: string | undefined;

  if (cookieToken) {
    token = cookieToken;
  } else if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ message: "JWT secret is not configured" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtUserPayload;
    (req as AuthRequest).user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
