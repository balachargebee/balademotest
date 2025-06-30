import type { ChargeBee } from "chargebee-typescript";

interface ChargebeeInstance {
    configure(config: { site: string; api_key: string }): void;
    hosted_page: {
        checkout_new_for_items(params: {
            subscription_items: Array<{ item_price_id: string; quantity: number }>;
            customer: { id: string };
            redirect_url: string;
            cancel_url: string;
        }): {
            request(options?: { headers?: Record<string, string> }): Promise<{
                hosted_page: { url: string };
            }>;
        };
    };
    subscription: {
        list(params: { "customer_id[is]": string }): {
            request(): Promise<{ list: Array<{ subscription: any }> }>;
        };
        retrieve(id: string): {
            request(): Promise<any>;
        };
    };
    portal_session: {
        create(params: { customer: { id: string }; redirect_url?: string }): {
            request(): Promise<{ portal_session: { access_url: string } }>;
        };
    };
}

declare const chargebee: {
    new(): ChargebeeInstance;
    configure(config: { site: string; api_key: string }): void;
};

declare module "chargebee" {
    export = chargebee;
}

export { }; 