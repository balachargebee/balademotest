import Chargebee from "chargebee";
import { API_KEY, SITE_ID } from "./config";

let chargebeeInstance: Chargebee | null = null;

export function getChargebeeClient() {
  // During SSG, return a mock client
  if (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV) {
    return {} as Chargebee;
  }

  // Return existing instance if already initialized
  if (chargebeeInstance) {
    return chargebeeInstance;
  }

  // Check environment variables
  if (!SITE_ID || !API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Chargebee environment variables are not set. Using mock client.");
      return {} as Chargebee;
    }
    throw new Error(
      "Chargebee environment variables are not set. Please set NEXT_PUBLIC_CHARGEBEE_SITE and CHARGEBEE_API_KEY in your environment variables."
    );
  }

  // Initialize new instance
  chargebeeInstance = new Chargebee();
  chargebeeInstance.configure({ site: SITE_ID, api_key: API_KEY });
  return chargebeeInstance;
}

export const chargebee = getChargebeeClient();
