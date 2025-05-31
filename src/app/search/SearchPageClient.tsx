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
  );
}

