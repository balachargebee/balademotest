import { z } from "zod";

// ✅ Client schema — for use in browser code
export const clientSchema = z.object({
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string(),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string(),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string(),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string(),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string(),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string(),
  NEXT_PUBLIC_CHARGEBEE_SITE: z.string({
    required_error: "NEXT_PUBLIC_CHARGEBEE_SITE is required for Chargebee integration",
  }).min(1, "NEXT_PUBLIC_CHARGEBEE_SITE cannot be empty"),
  NEXT_PUBLIC_HOST: z.string({
    required_error: "NEXT_PUBLIC_HOST is required for authentication callbacks",
  }).min(1, "NEXT_PUBLIC_HOST cannot be empty"),
});

export const clientEnv = {
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_CHARGEBEE_SITE: process.env.NEXT_PUBLIC_CHARGEBEE_SITE,
  NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
};

// ✅ Server schema — for secrets like API keys
export const serverSchema = z.object({
  DATABASE_URL: z.string({
    required_error: "DATABASE_URL is required for database connection",
  }).min(1, "DATABASE_URL cannot be empty"),
  NEXTAUTH_SECRET: z.string({
    required_error: "NEXTAUTH_SECRET is required for NextAuth.js",
  }).min(32, "NEXTAUTH_SECRET should be at least 32 characters"),
  NEXTAUTH_URL: z.string({
    required_error: "NEXTAUTH_URL is required for NextAuth.js",
  }).min(1, "NEXTAUTH_URL cannot be empty"),
  CHARGEBEE_API_KEY: z.string({
    required_error: "CHARGEBEE_API_KEY is required for Chargebee integration",
  }).min(1, "CHARGEBEE_API_KEY cannot be empty"),
  CHARGEBEE_ITEM_FAMILY_ID: z.string().optional(),
  GITHUB_CLIENT_ID: z.string({
    required_error: "GITHUB_CLIENT_ID is required for GitHub authentication",
  }).min(1, "GITHUB_CLIENT_ID cannot be empty"),
  GITHUB_CLIENT_SECRET: z.string({
    required_error: "GITHUB_CLIENT_SECRET is required for GitHub authentication",
  }).min(1, "GITHUB_CLIENT_SECRET cannot be empty"),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

export const serverEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  CHARGEBEE_API_KEY: process.env.CHARGEBEE_API_KEY,
  CHARGEBEE_ITEM_FAMILY_ID: process.env.CHARGEBEE_ITEM_FAMILY_ID,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};
