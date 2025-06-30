declare namespace NodeJS {
    interface ProcessEnv {
        // Server‑only (set in Vercel "Environment Variables")
        DIGITAL_PLAN_ID: string;
        PRINT_PLAN_ID: string;

        // Public – injected by next.config.mjs
        NEXT_PUBLIC_DIGITAL_PLAN_ID: string;
        NEXT_PUBLIC_PRINT_PLAN_ID: string;
    }
}

export { }; 