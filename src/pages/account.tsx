import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { useEffect } from "react";

/**
 * Minimal shape of a Chargebee subscription the page needs.
 * Extend later if you add more columns.
 */
interface SubscriptionRow {
    id: string;
    plan_id: string;
    status: string;
    /** Unix seconds timestamp of the next billing date (null when N/A) */
    next_billing_at?: number | null;
}

export default function Account() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { data: subscriptions, isLoading } = trpc.subscriptions.list.useQuery();
    const portalMutation = trpc.subscriptions.portalSession.useMutation();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/auth/signin");
        }
    }, [status, router]);

    if (status === "loading" || isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center text-white">
                Loading...
            </div>
        );
    }

    if (!subscriptions || subscriptions.length === 0) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center text-white">
                <h1 className="text-3xl font-bold mb-4">Your Subscriptions</h1>
                <p>No subscriptions found.</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-8">Your Subscriptions</h1>
            <table className="min-w-[400px] bg-white/10 rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Plan</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Next Bill Date</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.map((sub: SubscriptionRow) => (
                        <tr key={sub.id} className="border-t border-white/20">
                            <td className="px-4 py-2">{sub.plan_id}</td>
                            <td className="px-4 py-2">{sub.status}</td>
                            <td className="px-4 py-2">
                                {sub.next_billing_at
                                    ? new Date(sub.next_billing_at * 1000).toLocaleDateString()
                                    : "-"}
                            </td>
                            <td className="px-4 py-2">
                                {sub.status === "active" && (
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                        onClick={async () => {
                                            const res = await portalMutation.mutateAsync();
                                            if (res?.url) window.location.href = res.url;
                                        }}
                                    >
                                        Manage
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
} 