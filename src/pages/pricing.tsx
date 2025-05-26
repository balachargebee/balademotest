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

interface Props {
  items: Item[];
  itemPrices: ItemPrice[];
}

export default function PricingPage({ items, itemPrices }: Props) {
  return <Pricing items={items} itemPrices={itemPrices} />;
}

export async function getStaticProps(
  context: CreateContextOptions
): Promise<GetStaticPropsResult<any>> {
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
    },
    revalidate: 3600,
  };
}
