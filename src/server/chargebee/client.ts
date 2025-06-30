import type { ChargeBee } from "chargebee-typescript";
import { API_KEY, SITE_ID } from "./config";

let chargebeeInstance: ChargeBee | null = null;

const mockClient: ChargeBee = {
  subscription: {
    create: async () => ({ subscription: {} }),
    list: async () => ({ list: [] }),
    cancel: async () => ({ subscription: {} }),
    retrieve: async () => ({ subscription: {} }),
  },
  hosted_page: {
    checkout_new: async () => ({ hosted_page: { url: "#" } }),
    checkout_existing: async () => ({ hosted_page: { url: "#" } }),
  },
  portal_session: {
    create: async () => ({ portal_session: { access_url: "#" } }),
  },
  customer: {
    list: async () => ({ list: [] }),
    retrieve: async () => ({ customer: {} }),
  },
} as unknown as ChargeBee;

// Helper to determine if we're in a static build
const isStaticBuild = () => {
  return process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV;
};

export async function getChargebeeClient(): Promise<ChargeBee> {
  // Always return mock client during static builds
  if (isStaticBuild()) {
    return mockClient;
  }

  // Return cached instance if available
  if (chargebeeInstance) {
    return chargebeeInstance;
  }

  // Check environment variables
  if (!SITE_ID || !API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Chargebee environment variables are not set. Using mock client.");
      return mockClient;
    }
    throw new Error(
      "Chargebee environment variables are not set. Please set NEXT_PUBLIC_CHARGEBEE_SITE and CHARGEBEE_API_KEY in your environment variables."
    );
  }

  try {
    // Import Chargebee dynamically to avoid SSG issues
    const { default: ChargebeeSDK } = await import("chargebee");

    // Configure new instance
    const instance = ChargebeeSDK.configure({ site: SITE_ID, api_key: API_KEY });
    chargebeeInstance = instance as unknown as ChargeBee;
    return chargebeeInstance;
  } catch (error) {
    console.error("Failed to initialize Chargebee:", error);
    return mockClient;
  }
}

// Export a function that returns a promise instead of initializing at the top level
export const initChargebee = getChargebeeClient;
