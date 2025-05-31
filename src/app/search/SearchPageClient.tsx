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
  clean_avg_value: number | null;
};

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setResults(data.cards || []))
        .catch((err) => console.error("❌ Search fetch error:", err))
        .finally(() => setLoading(false));
    }
  }, [query]);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Results for "{query}"</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-gray-500">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((card) => {
            // ✅ FIXED: Only encode full URL once
            const safeQuery = `${card.card_name} ${card.card_number}`.replace(/[^a-zA-Z0-9\s-]/g, '');
            const baseUrl = `https://www.ebay.co.uk/sch/i.html?_nkw=${safeQuery}&LH_BIN=1&LH_PrefLoc=1&_ex_kw=psa bundle lot&_in_kw=3`;
            const affiliateUrl = `https://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575564066&toolid=10001&campid=5339108925&customid=${encodeURIComponent(
              card.card_name
            )}-${card.card_number}&mpre=${encodeURIComponent(baseUrl)}`;

            return (
              <div
                key={card.unique_id}
                className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
              >
                <Link href={`/card/${card.unique_id}`}>
                  <Image
                    src={card.card_image_url || "/placeholder.png"}
                    alt={card.card_name}
                    width={300}
                    height={420}
                    className="rounded-xl mx-auto"
                  />
                </Link>

                <div className="mt-3 space-y-1 text-center">
                  <p className="font-bold text-lg">{card.card_name}</p>
                  <p className="text-sm text-gray-500">
                    {card.set_name} #{card.card_number}
                  </p>
                  <p className="text-sm text-green-700">
                    🔥 Live Market Estimate: £
                    {!isNaN(Number(card.clean_avg_value))
                      ? Number(card.clean_avg_value).toFixed(2)
                      : "N/A"}
                  </p>
                  <a
                    href={affiliateUrl}
                    className="mt-1 inline-block bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded-full font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

