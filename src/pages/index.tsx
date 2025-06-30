import Head from "next/head";
import { Navbar } from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const plans = [
  {
    id: process.env.NEXT_PUBLIC_DIGITAL_PLAN_ID || "Digital-GBP-Every-3-months",
    name: "Digital",
    price: "£18.99",
    interval: "every 3 months",
    description: "Read PC Gamer on all your devices.",
  },
  {
    id: process.env.NEXT_PUBLIC_PRINT_PLAN_ID || "Print-GBP-Every-3-months",
    name: "Print",
    price: "£25.99",
    interval: "every 3 months",
    description: "Get the print magazine delivered to your door.",
  },
];

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const checkoutMutation = trpc.checkout.checkoutNew.useMutation();

  const handleCheckout = async (planId: string) => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    const res = await checkoutMutation.mutateAsync({ planId });
    if (res?.url) {
      window.location.href = res.url;
    }
  };

  return (
    <>
      <Head>
        <title>PC Gamer Subscription Demo</title>
        <meta name="description" content="PC Gamer self-service subscription demo" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <img src="/demo.png" alt="PC Gamer" className="w-48 mb-4" />
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[4rem]">
            <span className="text-red-600">PC\u00a0Gamer</span> Subscription
          </h1>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="flex flex-col gap-4 rounded-xl bg-white/10 p-8 text-white shadow-lg border border-white/20"
              >
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="text-4xl font-extrabold">{plan.price}</div>
                <div className="text-lg mb-2">{plan.interval}</div>
                <div className="text-base mb-4">{plan.description}</div>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
                  onClick={() => handleCheckout(plan.id)}
                  disabled={checkoutMutation.isLoading}
                >
                  {checkoutMutation.isLoading ? "Redirecting..." : "Subscribe"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
