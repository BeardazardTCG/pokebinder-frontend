'use client';

import Image from 'next/image';
import Link from 'next/link';
import FeaturedCards from '@/components/FeaturedCards';
import LiveScrapeStats from '@/components/LiveScrapeStats';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fefefe] text-zinc-800 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col items-center">
        {/* Logo and BETA tag */}
        <div className="relative mb-4">
          <Image
            src="/Assets/logos/pokebinder-logo.png"
            alt="PokéBinder"
            width={96}
            height={96}
            className="mx-auto"
          />
          <div className="absolute top-0 right-[-40px] rotate-12 bg-red-500 text-white px-2 py-1 text-[10px] font-bold shadow rounded">
            BETA TEST
          </div>
        </div>

        {/* Search Bar with Pikachu */}
        <div className="w-full relative max-w-xl mb-4">
          <div className="absolute -left-12 top-1">
            <Image
              src="/Assets/characters/pikachu.webp"
              alt="Pikachu"
              width={60}
              height={60}
              className="animate-bounce"
            />
          </div>
          <form action="/search" method="GET" className="w-full">
            <input
              name="q"
              type="text"
              placeholder="Search cards by name, set, or number..."
              className="w-full rounded-full border border-zinc-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </form>
        </div>

        {/* Fun Fact Bubble */}
        <div className="text-center text-sm italic text-zinc-500 mb-6">
          ⚡ Did you know? Some Pikachu cards are worth more than a PS5.
        </div>

        {/* Live scrape stats */}
        <LiveScrapeStats />

        {/* Featured Cards */}
        <div className="w-full mt-10">
          <FeaturedCards />
        </div>

        {/* Sealed Product Banner (hardcoded) */}
        <div className="w-full mt-10 border-t border-zinc-200 pt-6">
          <h2 className="text-lg font-bold text-zinc-700 mb-3">🔒 Sealed Products (Live Deals)</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-sm text-yellow-800 shadow-sm">
            🎁 We're tracking live sealed product listings from trusted UK eBay sellers. Stay tuned for rotating deals!
          </div>
        </div>

        {/* Coming Soon Sticky Note */}
        <div className="mt-12 relative">
          <div className="rotate-6 bg-yellow-300 px-2 py-1 text-xs font-bold text-zinc-800 shadow rounded">
            🚧 Coming Soon
          </div>

          <div className="mt-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700 shadow-sm w-72">
            <p className="mb-2 font-semibold">✨ Collector Tools on the Way:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Wishlist & Inventory Sync</li>
              <li>Smart Bundle Builder</li>
              <li>Grading & Sell Advice</li>
              <li>Auto-Listing to eBay</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
