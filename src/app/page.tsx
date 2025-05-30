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

  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchSealedItems() {
      try {
        const res = await fetch("/api/sealed");
        const json = await res.json();
        setItems(Array.isArray(json) ? json : []);
      } catch (err) {
        console.error("Failed to load sealed products:", err);
      }
    }
    fetchSealedItems();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 pb-12 space-y-6 bg-white text-black">
      <style>{`html, body { background-color: #fff; color: #000; color-scheme: light; }`}</style>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 🔺 TOP BLOCK: Logo + BETA + Search + Pikachu + Suggestions */}
      {/* ───────────────────────────────────────────────────────────── */}

      <div className="relative inline-block w-full max-w-[600px] mx-auto">
        <Image src="/beta-testing.png" alt="Beta Testing Stamp" width={240} height={75} className="absolute top-[85px] right-[-40px] rotate-[-20deg] opacity-90 z-30 hidden sm:block" />
        <Image src="/pokebinder-logo.png" alt="PokeBinder Logo" width={540} height={540} className="w-[80%] max-w-[540px] mx-auto mb-2" />
        <Image src="/beta-testing.png" alt="Beta Testing Stamp" width={120} height={40} className="block sm:hidden mx-auto mt-[-20px] rotate-[-12deg] opacity-90 z-30" />
      </div>

      <div className="relative flex items-center w-[90%] max-w-[900px] -mt-4">
        <Image src="/pokeball-icon-v2.png" alt="Search Icon" width={28} height={28} className="absolute left-4 top-4" />
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
        <Image src="/pikachu-cap.png" alt="Pikachu" width={100} height={100} className="absolute right-[-45px] top-[-16px] z-10" />
      </div>

      <div className="mt-3 text-sm sm:text-base text-yellow-700 bg-white border border-yellow-300 px-4 py-2 rounded-full shadow-sm text-center max-w-xs mx-auto">
        {funFacts[factIndex]}
      </div>

      <div className="mt-2 text-sm text-gray-600 text-center">
        Try: <Link href="/card/g1-11" className="text-blue-600 hover:underline">Charizard EX</Link>, <Link href="/card/base1-10" className="text-blue-600 hover:underline">Mewtwo</Link>
      </div>

      <section className="w-full max-w-3xl mt-6 px-4">
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 text-gray-800 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 mb-2">📊 Live Market Activity</h2>
          <LiveScrapeStats />
        </div>
      </section>

      <section className="w-full max-w-6xl mt-12 px-4">
        <div className="border-t border-orange-300 mb-6"></div>
        <h2 className="text-xl font-bold text-orange-600 tracking-wide mb-4">🔥 Featured Cards</h2>
        <FeaturedCards />
      </section>

      <section className="w-full max-w-6xl px-4 mt-12">
        <div className="border border-yellow-300 bg-yellow-50 rounded-xl px-6 py-4 shadow-sm">
          <h2 className="text-base font-bold text-purple-700 text-left mb-4">🛍️ Sealed Products (Affiliate)</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {items.map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm text-center min-w-[220px] max-w-[260px]">
                <p className="text-sm font-semibold truncate">{item.title}</p>
                <p className="text-green-700 font-bold text-lg mt-1">£{item.price.toFixed(2)}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded font-bold text-sm"
                >Buy on eBay</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
