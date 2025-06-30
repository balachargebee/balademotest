import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import chargebee from "../../../lib/chargebee";

export const subscriptionsRouter = router({
    list: protectedProcedure
        .query(async ({ ctx }) => {
            const cb = chargebee;
            const resp = await cb.subscription
                .list({ "customer_id[is]": ctx.auth.userId })
                .request();
            return resp.list.map((item: any) => item.subscription);
        }),
    portalSession: protectedProcedure
        .mutation(async ({ ctx }) => {
            const cb = chargebee;
            const { portal_session } = await cb.portal_session
                .create({
                    customer: { id: ctx.auth.userId },
                    redirect_url: `${process.env.NEXT_PUBLIC_HOST}/account`,
                })
                .request();
            return { url: portal_session.access_url };
        }),
}); 