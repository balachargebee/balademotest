import Chargebee from "chargebee";
import { API_KEY, SITE_ID } from "./config";
import type { ChargeBee } from "chargebee-typescript";

let chargebeeInstance: ChargeBee | null = null;

export function getChargebeeClient(): ChargeBee {
  // During SSG, return a mock client
  if (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV) {
    return {} as ChargeBee;
  }

  // Return existing instance if already initialized
  if (chargebeeInstance) {
    return chargebeeInstance;
  }

  // Check environment variables
  if (!SITE_ID || !API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Chargebee environment variables are not set. Using mock client.");
      return {} as ChargeBee;
    }
    throw new Error(
      "Chargebee environment variables are not set. Please set NEXT_PUBLIC_CHARGEBEE_SITE and CHARGEBEE_API_KEY in your environment variables."
    );
  }

  // Initialize new instance
  const cb = new Chargebee();
  cb.configure({ site: SITE_ID, api_key: API_KEY });
  chargebeeInstance = cb as unknown as ChargeBee;
  return chargebeeInstance;
}

export const chargebee = getChargebeeClient();
