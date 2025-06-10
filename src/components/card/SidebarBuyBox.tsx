'use client';

import Image from 'next/image';

interface Props {
  query: string;
  side: 'left' | 'right';
}

export default function SidebarBuyBox({ query, side }: Props) {
  if (!query.trim()) return null;

  const refinedQuery = query
    .toLowerCase()
    .replace(/\b(promo|lot|bundle|psa|proxy)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim() + ' card';

  const ebayUrl = `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(
    refinedQuery
  )}&_sop=1&_ipg=50&_in_kw=4&LH_BIN=1&rt=nc&LH_PrefLoc=1&campid=5339108925`;

  return (
    <div className="sticky top-20 flex flex-col gap-6 w-full max-w-[280px]">
      {/* === eBay Buy Now Box === */}
      <div className="relative bg-white border-2 border-orange-200 rounded-3xl p-5 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out group overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-300"></div>

        <div className="flex items-center justify-between mb-3 relative z-10">
          <h4 className="font-bold text-orange-700 text-sm tracking-wide flex items-center gap-1">
            🔥 eBay Buy Now
          </h4>
          <Image src="/Assets/icons/ebay.png" alt="eBay" width={24} height={24} />
        </div>

        <p className="text-xs text-zinc-600 leading-snug mb-4 relative z-10">
          Browse trusted UK Buy It Now listings for <strong className="text-zinc-800">{query}</strong>.
        </p>

        <a
          href={ebayUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-bold text-center px-4 py-2 rounded-2xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200 ease-in-out group-hover:translate-y-[-1px] border border-orange-600 relative z-10"
        >
          🛒 View on eBay
        </a>

        <p className="text-[10px] text-zinc-400 mt-2 text-center italic relative z-10">
          Affiliate link – helps support PokéBinder ❤️
        </p>
      </div>

      {/* === Column 3: Pro Features === */}
      <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-4 shadow-sm ring-1 ring-zinc-100 text-sm text-zinc-800">
        <div className="mb-2 flex items-center justify-between">
          <img
            src="/Assets/logos/pokebinder-logo.png"
            alt="PokéBinder"
            className="h-10 w-auto object-contain"
          />
          <div className="rotate-6 bg-yellow-300 px-2 py-1 text-xs font-bold text-zinc-800 shadow rounded">
            🚧 Coming Soon
          </div>
        </div>

        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 shadow-sm">
          <strong className="mb-1 block">🚀 Smart Suggestions (Pro)</strong>
          Bundling tips, sell timing, and AI-powered collector strategy.
        </div>

        <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 shadow-sm">
          <strong className="mb-1 block">📈 Price Trends (Pro)</strong>
          Track this card’s value over time. Get alerts for spikes or dips.
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
          <strong className="mb-1 block">🛠️ Auto-List to eBay (Pro)</strong>
          1-click relisting based on value changes. Stay hands-free.
        </div>

        <div className="mt-2 space-y-3">
          <button className="w-full rounded-lg border border-pink-400 bg-pink-50 px-4 py-2 font-medium text-pink-700 shadow-sm hover:bg-pink-100">
            ❤️ Add to Wishlist
          </button>
          <button className="w-full rounded-lg border border-green-500 bg-green-50 px-4 py-2 font-medium text-green-700 shadow-sm hover:bg-green-100">
            📦 Add to Inventory
          </button>
          <label className="flex items-center gap-2 text-zinc-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300 text-red-600 focus:ring-red-500"
            />
            🚩 Flag this card (we’ll review quietly)
          </label>
        </div>

        <div className="mt-4 rounded-lg border border-indigo-300 bg-indigo-50 p-3 text-sm text-zinc-700 shadow-sm">
          🔐 <strong>Be first to access PokéBinder Pro</strong>
          <p className="mt-1 text-xs">Sign up now to get early access when Pro tools launch.</p>
          <button className="mt-2 w-full rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700 text-sm font-medium shadow">
            🔔 Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}
