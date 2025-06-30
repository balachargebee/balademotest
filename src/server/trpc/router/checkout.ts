import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { getChargebee } from "@/lib/chargebee";
import { TRPCError } from "@trpc/server";

export const checkoutRouter = router({
    checkoutNew: protectedProcedure
        .input(z.object({ planId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.session?.user?.id) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "User ID not found in session",
                });
            }

            try {
                const chargebee = await getChargebee();
                const idempotencyKey = `${ctx.session.user.id}-${input.planId}`;
                const { hosted_page } = await chargebee.hosted_page.checkout_new_for_items({
                    subscription_items: [{ item_price_id: input.planId, quantity: 1 }],
                    customer: { id: ctx.session.user.id },
                    redirect_url: `${process.env.NEXT_PUBLIC_HOST}/account?hp_id={hosted_page_id}`,
                    cancel_url: `${process.env.NEXT_PUBLIC_HOST}/pricing`,
                })
                    .request({ headers: { "Idempotency-Key": idempotencyKey } });
                return { url: hosted_page.url };
            } catch (error) {
                console.error("Error creating checkout session:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create checkout session",
                });
            }
        }),
}); 