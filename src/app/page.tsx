"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LiveScrapeStats from "@/components/LiveScrapeStats";
import FeaturedCards from "@/components/FeaturedCards";

const funFacts = [
  "✨ Caught feelings, not just prices",
  "✨ PSA 10? More like PTSD 10.",
  "✨ Verified: Charizard still overrated",
  "✨ Not financial advice... but maybe?",
  "✨ Minty fresh, like your browsing history",
  "✨ Now 60% less eBay search rage!",
  "✨ We know what 'NM' *really* means",
  "✨ Built by humans, powered by obsession",
];

// ─────────────────────────────────────────────────────────────
// 🔺 LOGIC: STATE + ROUTER
// ─────────────────────────────────────────────────────────────

export default function Home() {
  const [factIndex, setFactIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 pb-12 space-y-6 bg-white text-black">
      {/* Force light mode */}
      <style>{`html, body { background-color: #fff; color: #000; color-scheme: light; }`}</style>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 🔺 TOP BLOCK: Logo + BETA + Search + Pikachu + Suggestions */}
      {/* ───────────────────────────────────────────────────────────── */}

      <div className="relative inline-block w-full max-w-[600px] mx-auto">
        {/* Desktop BETA */}
        <Image
          src="/beta-testing.png"
          alt="Beta Testing Stamp"
          width={240}
          height={75}
          style={{ height: "auto" }}
          className="absolute top-[85px] right-[-40px] rotate-[-20deg] opacity-90 z-30 hidden sm:block"
        />

        {/* Logo */}
        <Image
          src="/pokebinder-logo.png"
          alt="PokeBinder Logo"
          width={540}
          height={540}
          style={{ height: "auto" }}
          className="w-[80%] max-w-[540px] mx-auto mb-2"
        />

        {/* Mobile BETA */}
        <Image
          src="/beta-testing.png"
          alt="Beta Testing Stamp"
          width={120}
          height={40}
          style={{ height: "auto" }}
          className="block sm:hidden mx-auto mt-[-20px] rotate-[-12deg] opacity-90 z-30"
        />
      </div>

      {/* SEARCH + ICON + PIKACHU */}
      <div className="relative flex items-center w-[90%] max-w-[900px] -mt-4">
        <Image
          src="/pokeball-icon-v2.png"
          alt="Search Icon"
          width={28}
          height={28}
          style={{ height: "auto" }}
          className="absolute left-4 top-4"
        />
        <input
          type="text"
          name="search"
          placeholder="Search cards (e.g. Charizard EX)..."
          className="w-full pl-12 pr-24 py-4 text-lg rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchTerm.trim()) {
              router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            }
          }}
        />
        {/* Pikachu - larger, overlapping right */}
        <Image
          src="/pikachu-cap.png"
          alt="Pikachu"
          width={85}
          height={85}
          style={{ height: "auto" }}
          className="absolute right-[-42px] top-[-12px] z-10"
        />
      </div>

      {/* Suggestions */}
      <div className="mt-2 text-sm text-gray-600 text-center">
        Try:{" "}
        <Link href="/card/g1-11" className="text-blue-600 hover:underline">
          Charizard EX
        </Link>
        ,{" "}
        <Link href="/card/base1-10" className="text-blue-600 hover:underline">
          Mewtwo
        </Link>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 📊 SCRAPE STATS BLOCK */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-3xl mt-6 px-4">
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 text-gray-800 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 mb-2">
            📊 Live Market Activity
          </h2>
          <LiveScrapeStats />
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 🔥 FEATURED CARDS */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-6xl mt-12 px-4">
        <div className="border-t border-orange-300 mb-6"></div>
        <h2 className="text-xl font-bold text-orange-600 tracking-wide mb-4">
          🔥 Featured Cards
        </h2>
        <FeaturedCards />
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 💬 SEALED BANNER (Text Only for Now) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-6xl px-4 mt-12">
        <div className="bg-yellow-100 border border-yellow-300 text-sm text-gray-800 rounded-xl px-6 py-3 text-center shadow-sm">
          Looking for sealed Pokémon products? Check out trusted UK sellers like eBay, Magic Madhouse, and Total Cards — stocked daily. 🔗
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 📌 COMING SOON STICKY NOTE */}
      {/* ───────────────────────────────────────────────────────────── */}
      <section className="w-full lg:w-[30%] min-w-[280px] bg-yellow-100 border-2 border-yellow-400 p-6 rounded-xl shadow-md relative rotate-[-2deg] mt-12">
        <h2 className="text-lg font-bold mb-3 text-gray-800 font-handwriting">
          Coming Soon to PokéBinder
        </h2>
        <ul className="text-sm text-gray-800 space-y-3 font-handwriting">
          <li>⚡ Full English Pokémon card DB</li>
          <li>🍃 Live prices from eBay & TCG</li>
          <li>🔮 Historical price trends</li>
          <li>🪨 Browse sets, eras, rarities</li>
          <li>🔥 Affiliate sealed products</li>
          <li>🧠 Grading AI, sell plugins, bundles</li>
        </ul>
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold transition-opacity opacity-80">
          Sign Up
        </button>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 🦶 FOOTER */}
      {/* ───────────────────────────────────────────────────────────── */}
      <footer className="w-full border-t border-gray-300 pt-6 pb-12 text-center text-sm text-gray-600 px-4">
        <p>🔧 Hand-coded in the UK using PostgreSQL, Railway, Next.js, and live eBay + TCG scrapes.</p>
        <p>💡 Built by collectors. Built for collectors. No suits. No shortcuts.</p>
        <p className="italic">CardCatch x PokéBinder — Honest prices. Global reach.</p>
      </footer>
    </main>
  );
}

