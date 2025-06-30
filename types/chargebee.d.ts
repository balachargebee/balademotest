/**
 * Minimal ambient declaration so TypeScript can resolve the
 * `import chargebee from "chargebee";` statement.
 * We treat the SDK as `any`; refine later if needed.
 */
declare const chargebee: any;
declare module "chargebee" {
    export = chargebee;
}

export { }; 