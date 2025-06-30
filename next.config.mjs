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
  env: {
    NEXT_PUBLIC_DIGITAL_PLAN_ID: process.env.DIGITAL_PLAN_ID,
    NEXT_PUBLIC_PRINT_PLAN_ID: process.env.PRINT_PLAN_ID,
  },
};
export default config;
