import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import chargebee from "../../../lib/chargebee";
import { TRPCError } from "@trpc/server";
import type { Context } from "../context";

export const subscriptionsRouter = router({
    list: protectedProcedure
        .query(async ({ ctx }: { ctx: Context }) => {
            const userId = ctx.session?.user?.id;
            if (!userId) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "User ID not found in session",
                });
            }

            const cb = chargebee;
            const resp = await cb.subscription
                .list({ "customer_id[is]": userId })
                .request();
            return resp.list.map((item: any) => item.subscription);
        }),
    portalSession: protectedProcedure
        .mutation(async ({ ctx }: { ctx: Context }) => {
            const userId = ctx.session?.user?.id;
            if (!userId) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "User ID not found in session",
                });
            }

            const cb = chargebee;
            const { portal_session } = await cb.portal_session
                .create({
                    customer: { id: userId },
                    redirect_url: `${process.env.NEXT_PUBLIC_HOST}/account`,
                })
                .request();
            return { url: portal_session.access_url };
        }),
});
