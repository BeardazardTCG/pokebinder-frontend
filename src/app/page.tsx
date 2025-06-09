// /src/app/page.tsx

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PokéBinder | Built by Collectors for Collectors',
  description: 'Live Pokémon card values, powered by eBay + CardCatch. Track, compare, and conquer the market.',
};

export default function Home() {
  // Temporary mock data for local development
  const featured = [];
  const sealed = [];
  const stats = { total: 0 };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to PokéBinder</h1>
        <p className="text-zinc-600 max-w-xl mx-auto">
          Track your collection with real-time card values from eBay. Verified data, collector-driven features, and smart market tools.
        </p>
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-400 italic text-sm">
          Note: Live data fetching has been temporarily disabled for development stability.
        </p>
      </div>
    </main>
  );
}
