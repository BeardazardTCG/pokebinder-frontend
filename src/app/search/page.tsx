"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import HalfCard from "@/components/card/HalfCard";
import SidebarBuyBox from "@/components/card/SidebarBuyBox";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <>
      <Header />
      <main className="flex max-w-7xl mx-auto px-4 pt-10 pb-20 gap-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block w-1/5 sticky top-28 self-start">
          <SidebarBuyBox query={query} side="left" />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-zinc-800 mb-1">
            Search Results
          </h1>
          <p className="text-base text-zinc-500 mb-6">
            Showing results for: <span className="text-orange-500 font-semibold">{query}</span>
          </p>

          {loading && <p className="text-sm text-zinc-400">Loading results...</p>}

          {!loading && results.length === 0 && (
            <div className="text-center text-gray-500 italic mt-8">
              😓 No cards matched your search.<br />
              Try something like "Pikachu", "Charizard", or "EX".
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((card) => (
              <HalfCard
                key={card.unique_id}
                unique_id={card.unique_id}
                card_name={card.card_name}
                card_number={card.card_number}
                set_name={card.set_name}
                set_logo_url={card.set_logo_url}
                card_image_url={card.card_image_url}
                clean_avg_value={card.clean_avg_value}
                price_range_seen_min={card.price_range_seen_min}
                price_range_seen_max={card.price_range_seen_max}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-1/5 sticky top-28 self-start">
          <SidebarBuyBox query={query} side="right" />
        </div>
      </main>
      <Footer />
    </>
  );
}
