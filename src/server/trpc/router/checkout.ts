import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import chargebee from "../../../lib/chargebee";

export const checkoutRouter = router({
    checkoutNew: protectedProcedure
        .input(z.object({ planId: z.string() }))
        .mutation(async ({ ctx, input }: { ctx: import('../context').Context; input: { planId: string } }) => {
            const cb = chargebee;
            const idempotencyKey = `${ctx.session!.user!.id}-${input.planId}`;
            const { hosted_page } = await cb.hosted_page.checkout_new_for_items({
                subscription_items: [{ item_price_id: input.planId, quantity: 1 }],
                customer: { id: ctx.session!.user!.id },
                redirect_url: `${process.env.NEXT_PUBLIC_HOST}/account?hp_id={hosted_page_id}`,
                cancel_url: `${process.env.NEXT_PUBLIC_HOST}/pricing`,
            })
                .request({ headers: { "Idempotency-Key": idempotencyKey } });
            return { url: hosted_page.url };
        }),
}); 