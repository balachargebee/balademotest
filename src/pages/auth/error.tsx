import { useRouter } from "next/router";
import Head from "next/head";
import Button from "@/components/ui/Button";

export default function ErrorPage() {
    const router = useRouter();
    const { error } = router.query;

    const getErrorMessage = (errorCode: string) => {
        switch (errorCode) {
            case "Configuration":
                return "There is a problem with the server configuration. Please contact support.";
            case "AccessDenied":
                return "Access denied. You may not have permission to sign in.";
            case "Verification":
                return "The sign in link is no longer valid. It may have been used already or it may have expired.";
            default:
                return "An error occurred during sign in. Please try again.";
        }
    };

    return (
        <>
            <Head>
                <title>Sign In Error - PC Gamer</title>
            </Head>
            <section className="bg-black">
                <div className="align-center mx-auto flex max-w-6xl flex-col items-center py-8 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="block max-w-sm rounded-lg border border-zinc-600 p-12 shadow-md">
                        <h1 className="mb-4 text-center text-2xl font-bold text-red-500">
                            Authentication Error
                        </h1>
                        <p className="mb-6 text-center text-white">
                            {getErrorMessage(error as string)}
                        </p>
                        <div className="flex justify-center">
                            <Button
                                onClick={() => router.push("/auth/signin")}
                                className="w-full"
                            >
                                Try Again
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
} 