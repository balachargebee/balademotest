// ✅ Server schema — for secrets like API keys
export const serverSchema = z.object({
  CHARGEBEE_API_KEY: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string()
});

export const serverEnv = {
  CHARGEBEE_API_KEY: process.env.CHARGEBEE_API_KEY,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
};
