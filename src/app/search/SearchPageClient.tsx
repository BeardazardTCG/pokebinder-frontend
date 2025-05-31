"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Card = {
  unique_id: string;
  card_name: string;
  card_number: string;
  set_name: string;
  set_logo_url: string | null;
  card_image_url: string | null;
  sold_ebay_median: number | null;
};

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Card[]>([]);

  useEffect(() => {
    if (query) {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setResults(data.cards || []))
        .catch((err) => console.error("❌ Search fetch error:", err));
    }
  }, [query]);

  return (
    <>
      <div className="relative w-full max-w-3xl mx-auto text-center mt-8">
        <Image src="/pokebinder-logo.png" alt="PokeBinder Logo" width={200} height={200} className="mx-auto mb-2" />
        <Image src="/beta-testing.png" alt="Beta Stamp" width={120} height={40} className="absolute top-0 right-[-30px] rotate-[-20deg] hidden sm:block" />
        <div className="relative mt-4">
          <Image src="/pokeball-icon-v2.png" alt="Search Icon" width={24} height={24} className="absolute left-4 top-3" />
          <input
            type="text"
            defaultValue={query}
            placeholder="Search cards (e.g. Charizard EX)..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = (e.target as HTMLInputElement).value;
                if (val.trim()) window.location.href = `/search?q=${encodeURIComponent(val.trim())}`;
              }
            }}
            className="w-full pl-12 pr-6 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Results for "{query}"</h1>

        {results.length === 0 ? (
          <p className="text-center text-gray-500">No results found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {results.map((card) => (
              <Link href={`/card/${card.unique_id}`} key={card.unique_id}>
                <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition">
                  <Image
                    src={card.card_image_url || "/placeholder.png"}
                    alt={card.card_name}
                    width={300}
                    height={420}
                    className="rounded-xl mx-auto"
                  />

                  <div className="mt-3 space-y-1 text-center">
                    <p className="font-bold text-lg">{card.card_name}</p>
                    <p className="text-sm text-gray-500">{card.set_name} #{card.card_number}</p>
                    <p className="text-sm text-green-700">
                      🔥 Live Market Estimate: £{card.sold_ebay_median != null ? card.sold_ebay_median.toFixed(2) : 'N/A'}
                    </p>
                    <button className="mt-1 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded-full font-semibold">
                      Buy Now
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
