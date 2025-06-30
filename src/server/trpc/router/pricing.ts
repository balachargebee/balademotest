import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const pricingRouter = router({
  getAllItemPrices: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.itemPrice.findMany();
    } catch (error) {
      console.error("Error fetching item prices:", error);
      return [];
    }
  }),
  getAllItems: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.item.findMany();
    } catch (error) {
      console.error("Error fetching items:", error);
      return [];
    }
  }),
  getItemPrice: publicProcedure
    .input(
      z.object({
        itemPriceId: z.string({
          required_error: "Item Price Id is required",
        }),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const itemPrice = await ctx.prisma.itemPrice.findUnique({
          where: {
            id: input.itemPriceId,
          },
        });

        if (!itemPrice) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Item price not found",
          });
        }

        return itemPrice;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        console.error("Error fetching item price:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch item price",
        });
      }
    }),
});
