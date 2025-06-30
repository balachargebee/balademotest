import Head from "next/head";
import React from "react";

export default function PCGamerLanding() {
  return (
    <>
      <Head>
        <title>PC Gamer Subscription Offers</title>
        <meta name="description" content="Subscribe to PC Gamer Magazine - Get the latest gaming news, reviews, and insights delivered to your door." />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #FFFFFF;
          color: #1f2937;
        }
        .pc-gamer-header {
          background-color: #CC0000;
          padding-top: 1rem;
          padding-bottom: 1rem;
        }
        .pc-gamer-header h1 {
          color: #FFFFFF;
        }
        .pc-gamer-red {
          background-color: #CC0000;
        }
        .pc-gamer-red-text {
          color: #CC0000;
        }
        .pc-gamer-red-border {
          border-color: #CC0000;
        }
        .card {
          background-color: #FFFFFF;
          border: 1px solid #D1D5DB;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .subscribe-button {
          background-color: #CC0000;
          color: #FFFFFF;
          transition: background-color 0.3s ease;
        }
        .subscribe-button:hover {
          background-color: #E60000;
        }
        .great-value-banner {
          background-color: #CC0000;
          color: white;
          padding: 4px 12px;
          font-size: 0.8rem;
          font-weight: bold;
          text-transform: uppercase;
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }
        .magazine-placeholder img {
          border: 2px solid #e5e7eb;
          width: 180px;
          height: 250px;
          object-fit: cover;
        }
        .payment-plan-box {
          background-color: #f3f4f6;
        }
      `}</style>

      <header className="pc-gamer-header text-center mb-10 relative">
        <div className="absolute top-4 right-4 text-white text-xs md:text-sm">
          Welcome, <span className="font-semibold">Bala</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight">
          PC GAMER
        </h1>
      </header>
      <p className="text-gray-600 text-center -mt-8 mb-12 text-lg">
        Magazine Subscription Offers
      </p>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Choose Your Preferred Subscription Package
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Single Issue */}
          <div className="card rounded-lg p-6 flex flex-col items-center text-center relative">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Single Issue</h3>
            <p className="text-sm text-gray-600 mb-4">
              (Print magazine delivered to your door)
            </p>
            <div className="magazine-placeholder my-4">
              <img
                src="https://i.imgur.com/L6VkG2f.png"
                alt="PC Gamer Magazine - The Witcher 3 Anniversary Special Cover"
                className="rounded shadow-lg mx-auto"
                onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  'https://placehold.co/180x250/e0e0e0/777777?text=Image+Error')
                }
              />
            </div>
            <p className="text-3xl font-bold text-gray-900 my-3">
              £12.49{' '}
              <span className="text-base font-normal text-gray-600">/ 1 issue</span>
            </p>
            <p className="text-sm text-gray-600 mb-6">(Delivery included)</p>
            <a
              href="#"
              className="subscribe-button text-white font-semibold py-3 px-8 rounded-md w-full text-lg hover:shadow-xl mt-auto"
            >
              Buy an issue
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-800 mt-4 underline"
            >
              Find out more
            </a>
          </div>

          {/* Print Subscription */}
          <div className="card rounded-lg p-6 flex flex-col items-center text-center relative border-2 pc-gamer-red-border shadow-2xl">
            <div className="great-value-banner">Great Value</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-5">Print</h3>
            <p className="text-sm text-gray-600 mb-1">
              (Print magazine delivered to your door)
            </p>
            <p className="text-xs pc-gamer-red-text font-semibold mb-4">
              Includes digital access
            </p>
            <div className="magazine-placeholder my-4">
              <img
                src="https://i.imgur.com/L6VkG2f.png"
                alt="PC Gamer Print Edition Magazine Cover"
                className="rounded shadow-lg mx-auto"
                onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  'https://placehold.co/180x250/e0e0e0/777777?text=Image+Error')
                }
              />
            </div>
            <p className="text-3xl font-bold text-gray-900 my-1">
              £8.92{' '}
              <span className="text-base font-normal text-gray-600">/ issue</span>
            </p>
            <p className="text-sm text-gray-600 mb-3">
              (Billed at £25.99 per quarter / 3 issues)
            </p>

            <div className="payment-plan-box p-3 rounded-md w-full my-3 text-left">
              <p className="text-sm font-semibold text-gray-800">
                Confirm payment plan:
              </p>
              <p className="text-xs text-gray-700">
                Rolling subscription (Cancel online at any time)
              </p>
            </div>

            <a
              href="https://futuresandbox-test.chargebee.com/pages/v4/cAYcdHooPxNWgNpP9ccdxGWqCj3G9NCYWX/?signature=XqCXcucujaPqgpKRS6Dcdxvv8AVupstUYIQ"
              target="_blank"
              rel="noreferrer"
              className="subscribe-button text-white font-semibold py-3 px-8 rounded-md w-full text-lg hover:shadow-xl mt-auto"
            >
              Subscribe to Print
            </a>
          </div>

          {/* Digital Subscription */}
          <div className="card rounded-lg p-6 flex flex-col items-center text-center relative">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Digital</h3>
            <p className="text-sm text-gray-600 mb-4">
              (Instant digital access on iOS or Android)
            </p>
            <div className="magazine-placeholder my-4">
              <img
                src="https://i.imgur.com/48W55x2.png"
                alt="PC Gamer Digital Edition Magazine Cover"
                className="rounded shadow-lg mx-auto"
                onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  'https://placehold.co/180x250/e0e0e0/777777?text=Image+Error')
                }
              />
            </div>
            <p className="text-3xl font-bold text-gray-900 my-1">
              £3.69{' '}
              <span className="text-base font-normal text-gray-600">/ issue</span>
            </p>
            <p className="text-sm text-gray-600 mb-3">
              (Billed at £11.99 per quarter / 3 issues)
            </p>

            <div className="payment-plan-box p-3 rounded-md w-full my-3 text-left">
              <p className="text-sm font-semibold text-gray-800">
                Confirm payment plan:
              </p>
              <p className="text-xs text-gray-700">
                Rolling subscription (Cancel online at any time)
              </p>
            </div>

            <a
              href="https://futuresandbox-test.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Digital-GBP-Every-3-months&utm_source=cb-app-copy"
              target="_blank"
              rel="noreferrer"
              className="subscribe-button text-white font-semibold py-3 px-8 rounded-md w-full text-lg hover:shadow-xl mt-auto"
            >
              Subscribe to Digital
            </a>
          </div>

        </div>
      </main>

      <footer className="text-center py-12 mt-8">
        <p className="text-gray-500 text-sm">&copy; 2025 PC Gamer. All rights reserved. Demo page.</p>
      </footer>
    </>
  );
}
