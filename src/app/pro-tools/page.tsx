"use client";

import Head from "next/head";
import Link from "next/link";
import TopSocialBanner from "@/components/card/TopSocialBanner";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function ProToolsPage() {
  return (
    <>
      <Head>
        <title>PokéBinder Pro Tools | Advanced Collector Features</title>
        <meta
          name="description"
          content="Unlock advanced tools for serious Pokémon card collectors. Trend tracking, smart suggestions, and auto-listing powered by live market data."
        />
      </Head>

      <TopSocialBanner />
      <Header />

      <main className="flex flex-col items-center justify-center min-h-screen px-4 pb-16 pt-8 bg-white text-black space-y-8">
        {/* Hero */}
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Unlock the Full Power of PokéBinder
          </h1>
          <p className="text-gray-700 text-sm sm:text-base mt-2">
            Serious tools for serious collectors — trend alerts, pricing insights, listing automation, and more.
          </p>
          <div className="mt-4">
            <Link
              href="/signup"
              className="bg-yellow-400 text-black px-5 py-3 rounded-full text-sm font-semibold shadow hover:bg-yellow-300"
            >
              Get Early Access + Win 50 Cards
            </Link>
          </div>
        </section>

        {/* Tool Grid */}
        <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {[
            {
              name: "Smart Suggestions",
              desc: "Know which cards to buy, hold, or sell."
            },
            {
              name: "Trend Tracker",
              desc: "Watch price shifts before they hit the market."
            },
            {
              name: "Auto-Listing Tool",
              desc: "Prep your eBay listings with live data."
            },
            {
              name: "Bundle Builder",
              desc: "Trade-ready groups, priced by the system."
            },
            {
              name: "Grading AI",
              desc: "Scan condition from photos (coming soon)."
            },
            {
              name: "Language Unifier",
              desc: "Match Japanese, German, and English listings."
            },
          ].map((tool, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center px-4 py-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-900 text-lg">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{tool.desc}</p>
            </div>
          ))}
        </section>

        {/* CTA again */}
        <section className="text-center">
          <p className="text-sm text-gray-700 max-w-md mx-auto mb-3">
            PokéBinder Pro will launch with affordable monthly and lifetime plans. Our core tools will always remain free.
          </p>
          <Link
            href="/signup"
            className="bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-semibold shadow hover:bg-yellow-300"
          >
            Join the Launch List
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
