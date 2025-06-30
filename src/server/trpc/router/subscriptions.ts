import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { getChargebee } from "@/lib/chargebee";
import { TRPCError } from "@trpc/server";

export const subscriptionsRouter = router({
    list: protectedProcedure
        .query(async ({ ctx }) => {
            if (!ctx.session?.user?.id) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "User ID not found in session",
                });
            }

            try {
                const chargebee = await getChargebee();
                const resp = await chargebee.subscription
                    .list({
                        limit: 100,
                        "customer_id[is]": ctx.session.user.id
                    } as any)
                    .request();

                if (!resp?.list) {
                    console.warn("No subscription list found in response");
                    return [];
                }

                return resp.list.map((item: any) => {
                    if (!item?.subscription) {
                        console.warn("Subscription item missing in response");
                        return null;
                    }
                    return item.subscription;
                }).filter(Boolean);
            } catch (error) {
                console.error("Error fetching subscriptions:", error);
                if (process.env.NODE_ENV === "development") {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: `Failed to fetch subscriptions: ${error instanceof Error ? error.message : 'Unknown error'}`,
                    });
                }
                return [];
            }
        }),
    portalSession: protectedProcedure
        .mutation(async ({ ctx }) => {
            if (!ctx.session?.user?.id) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "User ID not found in session",
                });
            }

            try {
                const chargebee = await getChargebee();
                const result = await chargebee.portal_session
                    .create({
                        customer: { id: ctx.session.user.id },
                        redirect_url: process.env.NEXT_PUBLIC_HOST
                            ? `${process.env.NEXT_PUBLIC_HOST}/account`
                            : "/account"
                    })
                    .request();

                if (!result?.portal_session?.access_url) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "Portal session URL not found in response",
                    });
                }

                return { url: result.portal_session.access_url };
            } catch (error) {
                console.error("Error creating portal session:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: process.env.NODE_ENV === "development"
                        ? `Failed to create portal session: ${error instanceof Error ? error.message : 'Unknown error'}`
                        : "Failed to create portal session",
                });
            }
        }),
});
