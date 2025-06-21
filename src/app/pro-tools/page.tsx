"use client";

import Head from "next/head";
import Link from "next/link";
import TopSocialBanner from "@/components/card/TopSocialBanner";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { useState } from "react";

export default function ProToolsPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [code, setCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) {
      setStatus("success");
      setCode(data.code);
    } else {
      setStatus("error");
    }
  };

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

      <main className="flex flex-col items-center justify-center min-h-screen px-4 pb-16 pt-8 bg-white text-black space-y-16">
        {/* Hero */}
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Unlock the Full Power of PokéBinder
          </h1>
          <p className="text-gray-700 text-sm sm:text-base mt-2">
            Serious tools for serious collectors — trend alerts, pricing insights, listing automation, and more.
          </p>
        </section>

        {/* Email Signup + Code Card Reward */}
        <section className="w-full bg-yellow-100 border-t-4 border-b-4 border-yellow-300 py-10 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              Get a Free TCG Code + Enter to Win 50 Cards
            </h2>
            <p className="text-sm sm:text-base text-gray-700 max-w-xl mx-auto">
              Sign up now and we’ll email you a real Pokémon TCG code instantly. Every 50 signups, one trainer wins a 50-card bundle.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="px-4 py-3 rounded-full border border-gray-300 shadow-sm w-full sm:w-[300px] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold text-sm shadow hover:bg-yellow-300"
              >
                Get My Free Code
              </button>
            </form>
            {status === "success" && code && (
              <div className="mt-5 inline-block px-5 py-3 bg-green-100 text-green-800 font-bold rounded-full shadow-md">
                ✅ Your code: <span className="tracking-widest">{code}</span>
              </div>
            )}
            {status === "error" && (
              <p className="mt-4 text-red-600 text-sm">❌ Something went wrong. Please try again.</p>
            )}
          </div>
        </section>

        {/* Feature Header */}
        <section className="text-center px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Here’s What Pro Unlocks
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto mt-2">
            Built for flippers, collectors, and serious market watchers.
          </p>
        </section>

        {/* Tool Grid */}
        <section className="w-full bg-gray-50 py-10 px-4 border-t border-b border-gray-200">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                className="flex flex-col items-center text-center px-4 py-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition relative"
              >
                <span className="absolute top-3 right-3 text-[10px] font-bold bg-red-500 text-white px-2 py-1 rounded-full shadow">PRO</span>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA again */}
        <section className="text-center px-4">
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
