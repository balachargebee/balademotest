import superjson from "superjson";
import Pricing from "@/components/Pricing";
import type { GetStaticPropsResult } from "next";
import type { Item, ItemPrice } from "@prisma/client";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "@/server/trpc/router/_app";
import {
  CreateContextOptions,
  createContextInner,
} from "@/server/trpc/context";

export default function PricingPage() {
  return <Pricing />;
}

export async function getStaticProps(
  context: CreateContextOptions
): Promise<GetStaticPropsResult<any>> {
  try {
    const ctx = await createContextInner(context);
    const ssg = await createProxySSGHelpers({
      router: appRouter,
      ctx,
      transformer: superjson,
    });

    let items: Item[] = [];
    let itemPrices: ItemPrice[] = [];

    try {
      [items, itemPrices] = await Promise.all([
        ssg.pricing.getAllItems.fetch(),
        ssg.pricing.getAllItemPrices.fetch(),
      ]);
    } catch (error) {
      console.error("❌ Error fetching pricing data:", error);
    }

    return {
      props: {
        items,
        itemPrices,
        trpcState: ssg.dehydrate(),
      },
      revalidate: 3600,
    };
  } catch (error) {
    // If context creation fails during SSG, return empty data
    console.error("❌ Error creating context:", error);
    return {
      props: {
        items: [],
        itemPrices: [],
      },
      revalidate: 3600,
    };
  }
}
