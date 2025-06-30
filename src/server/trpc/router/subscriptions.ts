import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import chargebee from "../../../lib/chargebee";
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
            const cb = chargebee;
            const resp = await cb.subscription
                .list({ "customer_id[is]": ctx.session.user.id })
                .request();
            return resp.list.map((item: any) => item.subscription);
        }),
    portalSession: protectedProcedure
        .mutation(async ({ ctx }) => {
            if (!ctx.session?.user?.id) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "User ID not found in session",
                });
            }
            const cb = chargebee;
            const { portal_session } = await cb.portal_session
                .create({
                    customer: { id: ctx.session.user.id },
                    redirect_url: `${process.env.NEXT_PUBLIC_HOST}/account`,
                })
                .request();
            return { url: portal_session.access_url };
        }),
});
