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

type SealedItem = {
  title: string;
  price: number;
  img: string | null;
  url: string | null;
  set: string;
  warning?: boolean;
};

function SealedProducts() {
  const [items, setItems] = useState<SealedItem[]>([]);

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
    <div className="mt-12">
      <h2 className="text-lg font-bold mb-4 text-purple-700 text-left">
        🛍️ Sealed Products (Affiliate)
      </h2>
      {items.length === 0 ? (
        <p className="text-sm italic text-gray-500">
          No products found. Check API connection or proxy.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
              {item.img ? (
                <Image
                  src={item.img}
                  alt={item.title}
                  width={200}
                  height={200}
                  style={{ height: "auto" }}
                  className="object-contain mb-2"
                />
              ) : (
                <div className="w-[200px] h-[200px] bg-gray-100 flex items-center justify-center text-xs text-gray-500 italic rounded">
                  No image
                </div>
              )}
              <p className="text-sm font-semibold text-center line-clamp-2">{item.title}</p>
              <p className="text-sm text-gray-500 italic">{item.set}</p>
              <p className="text-green-700 font-bold mt-1 text-lg">
                £{isNaN(item.price) ? "0.00" : item.price.toFixed(2)}
              </p>
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded"
                >
                  Buy on eBay
                </a>
              ) : (
                <p className="text-xs italic text-gray-400 mt-2">No listing available</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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
    <main className="flex flex-col items-center justify-center min-h-screen px-4 pb-12 space-y-6">
      <div className="flex flex-col items-center w-full relative -mt-12">
        <div className="relative inline-block">
          <Image
            src="/beta-testing.png"
            alt="Beta Testing Stamp"
            width={160}
            height={50}
            style={{ height: "auto" }}
            className="absolute top-[85px] left-[calc(50%+70px)] rotate-[-20deg] opacity-90 z-30"
          />
          <Image
            src="/pokebinder-logo.png"
            alt="PokeBinder Logo"
            width={420}
            height={420}
            style={{ height: "auto" }}
            className="mx-auto mb-6"
          />
        </div>

        <div className="relative flex items-center w-[80%] max-w-[900px]">
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
            className="w-full pl-12 pr-4 py-4 text-lg rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchTerm.trim()) {
                router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
              }
            }}
          />
          <Image
            src="/pikachu-cap.png"
            alt="Pikachu"
            width={180}
            height={180}
            style={{ height: "auto" }}
            className="absolute -right-24 -top-12"
          />
          <div className="absolute right-0 -top-12 translate-x-20 -translate-y-1 max-w-xs z-10 bg-white border border-gray-300 text-black text-xs font-semibold px-4 py-2 rounded-xl shadow-md">
            {funFacts[factIndex]}
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          Try: <Link href="/card/g1-11" className="text-blue-600 hover:underline">Charizard EX</Link>,{" "}
          <Link href="/card/base1-10" className="text-blue-600 hover:underline">Mewtwo</Link>
        </div>
      </div>

      <LiveScrapeStats />
      <hr className="w-full max-w-3xl border-t border-gray-200" />

      <div className="flex flex-row justify-between items-start w-full max-w-[1600px] px-8 mt-12 gap-16">
        <div className="w-[30%] min-w-[280px] bg-yellow-200 border border-yellow-400 p-6 rounded-xl shadow-md relative">
          <h2 className="text-md font-bold mb-3 text-gray-800">Coming Soon to PokéBinder</h2>
          <ul className="text-sm text-gray-800 space-y-3">
            <li>🟤 Full English Pokémon card DB</li>
            <li>⚡ Live prices from eBay & TCG</li>
            <li>🔮 Historical price trends</li>
            <li>🍃 Browse sets, eras, rarities</li>
            <li>🪨 Affiliate sealed products</li>
            <li>⚙️ Grading AI, sell plugins, bundles</li>
          </ul>
          <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700">
            Sign Up
          </button>
        </div>

        <div className="w-[70%]">
          <h2 className="text-lg font-bold mb-4 text-orange-600 text-left">🔥 Featured Cards</h2>
          <FeaturedCards />
          <SealedProducts />
        </div>
      </div>

      <footer className="text-xs text-gray-500 text-center mt-12">
        <p>🔧 Hand-coded in the UK using PostgreSQL, Railway, Next.js, and live eBay + TCG scrapes.</p>
        <p>💡 Built by collectors. Built for collectors. No suits. No shortcuts.</p>
        <p className="italic">CardCatch x PokéBinder — Honest prices. Global reach.</p>
      </footer>
    </main>
  );
}

