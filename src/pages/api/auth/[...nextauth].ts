import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "@/env/server.mjs";
import { prisma } from "@/server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        if (!user.email) {
          console.error("Sign in error: No email provided");
          return false;
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // Create user if doesn't exist
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || user.email.split("@")[0],
              image: user.image,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    signOut: "/",
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Custom URLs
  url: {
    baseUrl: env.NEXTAUTH_URL,
    origin: env.NEXTAUTH_URL,
  },
};

export default NextAuth(authOptions);
