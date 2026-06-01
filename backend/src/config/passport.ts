import passport from "passport";
import { Prisma } from "@prisma/client";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { prisma } from "./prisma.js";

type OAuthProfile = {
  id: string;
  displayName?: string | undefined;
  username?: string | undefined;
  emails?: Array<{ value?: string | undefined }> | undefined;
  photos?: Array<{ value?: string | undefined }> | undefined;
};

type OAuthProvider = "google" | "github";

function getProfileEmail(profile: OAuthProfile) {
  return profile.emails?.[0]?.value ?? null;
}

function getProfileAvatar(profile: OAuthProfile) {
  return profile.photos?.[0]?.value ?? null;
}

function getProfileName(profile: OAuthProfile) {
  return profile.displayName ?? profile.username ?? "OAuth User";
}

async function syncOAuthUser(profile: OAuthProfile, provider: OAuthProvider) {
  const email = getProfileEmail(profile);

  if (!email) {
    return null;
  }

  const avatarUrl = getProfileAvatar(profile);
  const name = getProfileName(profile);

  const existingAccount = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId: profile.id,
      },
    },
    include: {
      user: true,
    },
  });

  if (existingAccount) {
    if (avatarUrl && existingAccount.user.avatarUrl !== avatarUrl) {
      await prisma.user.update({
        where: { id: existingAccount.user.id },
        data: { avatarUrl },
      });
    }

    return existingAccount.user;
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  const user = existingUser
    ? await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name: existingUser.name || name,
          avatarUrl: avatarUrl ?? existingUser.avatarUrl,
        },
      })
    : await prisma.user.create({
        data: {
          name,
          email,
          avatarUrl,
        },
      });

  try {
    await prisma.account.create({
      data: {
        provider,
        providerAccountId: profile.id,
        userId: user.id,
      },
    });
  } catch (error) {
    if (
      !(error instanceof Prisma.PrismaClientKnownRequestError) ||
      error.code !== "P2002"
    ) {
      throw error;
    }
  }

  return user;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await syncOAuthUser(profile, "google");

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: `${process.env.SERVER_URL}/api/auth/github/callback`,
      scope: ["user:email"],
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: OAuthProfile,
      done: (error: unknown, user?: Express.User | false) => void
    ) => {
      try {
        const user = await syncOAuthUser(profile, "github");

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
