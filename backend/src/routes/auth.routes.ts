import { Router } from "express";
import {
  forgotPassword,
  logout,
  login,
  me,
  register,
  resetPassword,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";

const router = Router();
const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const ACCESS_TOKEN_COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

type OAuthCallbackUser = {
  id: number;
  email: string;
};

function getOAuthCallbackUser(user: unknown): OAuthCallbackUser | null {
  if (!user || typeof user !== "object") return null;

  const candidate = user as { id?: unknown; email?: unknown };

  if (typeof candidate.id !== "number" || typeof candidate.email !== "string") {
    return null;
  }

  return { id: candidate.id, email: candidate.email };
}

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Google/Github OAuth routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    const user = getOAuthCallbackUser(req.user);

    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL}/login`);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
    });

    res.redirect(`${process.env.CLIENT_URL}/oauth/callback`);
  }
);

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
    session: false,
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    const user = getOAuthCallbackUser(req.user);

    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL}/login`);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
    });

    res.redirect(`${process.env.CLIENT_URL}/oauth/callback`);
  }
);


export default router;
