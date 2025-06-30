import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { getChargebee } from "@/lib/chargebee";
import { TRPCError } from "@trpc/server";
import type { subscription_list_params } from "chargebee-typescript";

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
                const params: subscription_list_params = {
                    customer_id: {
                        is: ctx.session.user.id
                    },
                    limit: 100,
                    sort_by: {
                        desc: "created_at"
                    }
                };
                const resp = await chargebee.subscription
                    .list(params)
                    .request();
                return resp.list.map((item: any) => item.subscription);
            } catch (error) {
                console.error("Error fetching subscriptions:", error);
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
                const { portal_session } = await chargebee.portal_session
                    .create({
                        customer: { id: ctx.session.user.id },
                        redirect_url: `${process.env.NEXT_PUBLIC_HOST}/account`,
                    })
                    .request();
                return { url: portal_session.access_url };
            } catch (error) {
                console.error("Error creating portal session:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create portal session",
                });
            }
        }),
});
