import { router } from "../trpc";
import { authRouter } from "./auth";
import { pricingRouter } from "./pricing";
import { subscriptionRouter } from "./subscription";
import { exampleRouter } from "./example";
import { checkoutRouter } from "./checkout";
import { subscriptionsRouter } from "./subscriptions";

export const appRouter = router({
  auth: authRouter,
  pricing: pricingRouter,
  subscription: subscriptionRouter,
  example: exampleRouter,
  checkout: checkoutRouter,
  subscriptions: subscriptionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
