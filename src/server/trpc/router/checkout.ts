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

            if (!process.env.NEXT_PUBLIC_HOST) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "NEXT_PUBLIC_HOST environment variable is not set",
                });
            }

            try {
                const chargebee = await getChargebee();
                const idempotencyKey = `${ctx.session.user.id}-${input.planId}-${Date.now()}`;

                const result = await chargebee.hosted_page
                    .checkout_new_for_items({
                        subscription_items: [
                            {
                                item_price_id: input.planId,
                                quantity: 1
                            }
                        ],
                        customer: {
                            id: ctx.session.user.id,
                            email: ctx.session.user.email || undefined
                        },
                        redirect_url: `${process.env.NEXT_PUBLIC_HOST}/account`,
                        cancel_url: `${process.env.NEXT_PUBLIC_HOST}/pricing`,
                    })
                    .request({
                        headers: {
                            "Idempotency-Key": idempotencyKey
                        }
                    });

                if (!result?.hosted_page?.url) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: "No checkout URL returned from Chargebee",
                    });
                }

                return { url: result.hosted_page.url };
            } catch (error) {
                console.error("Error creating checkout session:", error);

                // Return more specific error messages in development
                if (process.env.NODE_ENV === "development") {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: `Failed to create checkout session: ${error instanceof Error ? error.message : "Unknown error"}`,
                    });
                }

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create checkout session. Please try again later.",
                });
            }
        }),
}); 