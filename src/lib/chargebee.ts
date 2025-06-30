import { env } from "@/env/server.mjs";

let chargebeeInstance: any = null;

async function loadChargebee() {
    if (chargebeeInstance) {
        return chargebeeInstance;
    }

    // During SSG, return a mock client
    if (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV) {
        return {
            hosted_page: {},
            subscription: {},
            portal_session: {},
        };
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
        return {
            hosted_page: {},
            subscription: {},
            portal_session: {},
        };
    }
}

export default await loadChargebee(); 