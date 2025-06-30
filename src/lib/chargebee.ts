import { env } from "@/env/server.mjs";
import type { ChargeBee } from "chargebee-typescript";

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

export async function getChargebee(): Promise<ChargeBee> {
    // Always return mock client during static builds
    if (isStaticBuild()) {
        return mockClient;
    }

    // Return cached instance if available
    if (chargebeeInstance) {
        return chargebeeInstance;
    }

    try {
        // Import Chargebee dynamically to avoid SSG issues
        const { default: ChargebeeSDK } = await import("chargebee");

        // Configure new instance
        const instance = ChargebeeSDK.configure({
            site: env.NEXT_PUBLIC_CHARGEBEE_SITE,
            api_key: env.CHARGEBEE_API_KEY,
        });

        chargebeeInstance = instance as unknown as ChargeBee;
        return chargebeeInstance;
    } catch (error) {
        console.error("Failed to initialize Chargebee:", error);
        return mockClient;
    }
}

// Export a mock client for SSR/SSG
const defaultClient = getMockClient();
export default defaultClient; 