import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-black">
      <div className="relative flex flex-col items-center">
        <img
          src="/next.svg"
          alt="Next JS"
          className="float absolute top-[5%] left-[25%] h-16 w-28 select-none opacity-60 grayscale hue-rotate-180 invert transition
					hover:scale-110 hover:opacity-100 hover:grayscale-0"
        />
        <img
          src="/trpc.svg"
          alt="tRPC"
          className="float absolute top-[25%] left-[15%] h-16 w-28 select-none opacity-80 grayscale hue-rotate-180 invert transition
					hover:scale-110 hover:opacity-100 hover:grayscale-0"
        />

        <img
          src="/tailwind.svg"
          alt="tailwind"
          className="float absolute top-[5%] right-[25%] h-16 w-32 select-none opacity-80 grayscale hue-rotate-180 invert transition
					hover:scale-110 hover:opacity-100 hover:grayscale-0"
        />
        <img
          src="/typescript.svg"
          alt="typescript"
          className="float absolute top-[25%] right-[15%] h-14 w-14 select-none opacity-80 grayscale hue-rotate-180 invert transition
					hover:scale-110 hover:opacity-100 hover:grayscale-0"
        />

        {/* Logo. */}
        <a href="https://chargebee.com" target="_blank" rel="noreferrer">
          <img
            src="/chargebee-logo.png"
            alt=""
            className="pulse h-24 w-24 cursor-pointer select-none opacity-80 grayscale hue-rotate-15 transition hover:opacity-100 hover:brightness-125 hover:grayscale-0"
          />
        </a>
        <div className="mb-8" />

        {/* Headings. */}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-light text-gray-100">
            <span className="font-bold text-gray-100">Next.js</span> SAAS Stack
          </h1>
          <div className="mb-1" />
          <p className="cursor-default text-lg font-semibold text-gray-400 transition hover:brightness-125">
            Open Source Template
          </p>
        </div>
        <div className="mb-6" />

        <div className="flex cursor-default flex-col items-center">
          <h1 className="text-center text-8xl font-bold text-gray-200">
            <span
              className="bg-clip-text
                                                        text-primary transition hover:brightness-125"
            >
              Subscribe
            </span>{" "}
            to The Week
          </h1>
          <h1
            className="bg-gradient-to-b from-gray-200 to-gray-400 bg-clip-text text-8xl
                                                font-bold text-transparent transition hover:brightness-125"
          >
            with Chargebee
          </h1>
        </div>
        <div className="mb-8" />

        <p className="max-w-lg text-center text-xl font-semibold text-gray-400">
          Build SAAS apps easily with{" "}
          <a
            href="https://www.chargebee.com/docs/2.0/product-catalog.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-100 underline decoration-gray-500 transition 
						hover:text-orange-200 hover:decoration-orange-200 active:opacity-80"
          >
            Chargebee Subscriptions
          </a>
        </p>
        <div className="mb-6" />

        {/* Buttons. */}
        <div className="flex flex-row items-center">
          <a
            href="https://github.com/bharathvaj-ganesan/chargebee-saas-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-row items-center rounded-xl border border-gray-600 px-6 text-base font-bold text-gray-200 
						transition hover:scale-105 hover:border-gray-200 hover:text-gray-100 active:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <div className="mx-1" />
            Documentation
          </a>
          <div className="mx-2" />

          <Link
            href="/pricing"
            className="flex h-12 flex-row items-center rounded-xl bg-primary px-6 text-base font-bold
                                                text-gray-100 transition hover:scale-105 hover:brightness-125 active:opacity-80"
          >
            View Plans
          </Link>
        </div>
      </div>
    </main>
  );
}
