import type { ChargeBee } from "chargebee-typescript";

/**
 * Minimal ambient declaration so TypeScript can resolve the
 * `import chargebee from "chargebee";` statement.
 * We treat the SDK as `any`; refine later if needed.
 */
declare const chargebee: {
    new(): ChargeBee;
    configure(config: { site: string; api_key: string }): void;
};

declare module "chargebee" {
    export = chargebee;
}

export { }; 