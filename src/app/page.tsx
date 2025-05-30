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
      setFactIndex((prevIndex) => (prevIndex + 1) % funFacts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search/${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <main className="relative min-h-screen bg-white text-black px-4 py-6 flex flex-col items-center">
      {/* BETA STAMP */}
      <div className="absolute top-2 left-2 rotate-[-12deg] bg-red-600 text-white px-2 py-1 text-xs font-bold rounded shadow-md z-50">
        BETA TEST
      </div>

      {/* Logo */}
      <div className="mb-6 mt-4">
        <Image
          src="/logo-pokebinder.png"
          alt="PokeBinder logo"
          width={180}
          height={180}
          priority
        />
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full max-w-lg rounded-full border border-gray-300 px-4 py-2 shadow-sm mb-4"
      >
        <span className="mr-2 text-xl">🕵️</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search cards (e.g. Charizard EX)"
          className="flex-grow outline-none bg-transparent text-base"
        />
      </form>

      {/* Fun Fact */}
      <div className="mb-4 text-center text-yellow-600 font-medium text-sm sm:text-base">
        {funFacts[factIndex]}
      </div>

      {/* Scrape Stats */}
      <LiveScrapeStats />

      {/* Featured Cards */}
      <section className="w-full max-w-3xl mt-8">
        <h2 className="text-xl font-semibold text-orange-500 mb-4 flex items-center">
          🔥 Featured Cards
        </h2>
        <FeaturedCards />
      </section>
    </main>
  );
}
