import { env } from "@/env/server.mjs";

let chargebeeInstance: any = null;

function getMockClient() {
    return {
        hosted_page: {
            checkout_new_for_items: () => ({
                request: async () => ({ hosted_page: { url: "#" } }),
            }),
        },
        subscription: {
            list: () => ({
                request: async () => ({ list: [] }),
            }),
            retrieve: () => ({
                request: async () => ({}),
            }),
        },
        portal_session: {
            create: () => ({
                request: async () => ({ portal_session: { access_url: "#" } }),
            }),
        },
    };
}

async function initializeChargebee() {
    if (chargebeeInstance) {
        return chargebeeInstance;
    }

    // During SSG, return a mock client
    if (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV) {
        return getMockClient();
    }

    try {
        // Dynamic import to handle webpack issues
        const Chargebee = (await import("chargebee")).default;
        const instance = Chargebee.configure({
            site: env.NEXT_PUBLIC_CHARGEBEE_SITE,
            api_key: env.CHARGEBEE_API_KEY,
        });
        chargebeeInstance = instance;
        return instance;
    } catch (error) {
        console.error("Failed to initialize Chargebee:", error);
        // Return a mock client in case of error
        return getMockClient();
    }
}

// Export a function that returns a promise
export async function getChargebee() {
    return initializeChargebee();
}

// Export a mock client for SSR/SSG
const defaultClient = getMockClient();
export default defaultClient; 