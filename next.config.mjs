// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async rewrites() {
    return [
      {
        source: "/settings",
        destination: "/settings/profile",
      },
    ];
  },
  /**
   * Env variables that MUST be present at build‑time.
   * We fail fast here instead of shipping a broken build.
   */
  env: (() => {
    const required = ['DIGITAL_PLAN_ID', 'PRINT_PLAN_ID'];
    for (const key of required) {
      if (!process.env[key]) {
        throw new Error(`[next.config] Missing env variable: ${key}`);
      }
    }
    return {
      NEXT_PUBLIC_DIGITAL_PLAN_ID: String(process.env.DIGITAL_PLAN_ID),
      NEXT_PUBLIC_PRINT_PLAN_ID: String(process.env.PRINT_PLAN_ID),
    };
  })(),
};
export default config;
