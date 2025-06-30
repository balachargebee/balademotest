import Chargebee from "chargebee";
import { env } from "@/env/server.mjs";

function initializeChargebee() {
    // During SSG, return a mock client
    if (process.env.NODE_ENV === "production" && !process.env.VERCEL_ENV) {
        return new Chargebee();
    }

    const cb = new Chargebee();
    cb.configure({
        site: env.NEXT_PUBLIC_CHARGEBEE_SITE,
        api_key: env.CHARGEBEE_API_KEY,
    });
    return cb;
}

const chargebee = initializeChargebee();
export default chargebee; 