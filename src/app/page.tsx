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

// ✅ Define sealed product structure for type safety
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
