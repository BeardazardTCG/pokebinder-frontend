'use client';

import Image from 'next/image';
import { useState } from 'react';
import SignupPrompt from '@/components/SignupPrompt';

type FullCardProps = {
  card?: {
    unique_id?: string;
    set_code?: string;
    card_name?: string;
    card_number?: string;
    card_image_url?: string;
    set_logo_url?: string;
    clean_avg_value?: number | null;
    price?: number | null;
    set_name?: string;
    sold_date?: string;
    median_price?: number | null;
    average_price?: number | null;
    verified_sales_logged?: number | null;
    price_range_seen_min?: number | null;
    price_range_seen_max?: number | null;
    type?: string | null;
  };
};

export default function FullCard(props: FullCardProps) {
  const card = props.card;
  const [showSignup, setShowSignup] = useState(false); // ✅ toggle for Notify Me

  if (!card || !card.card_name) {
    return <div className="p-4 text-red-600">Card data is missing or incomplete.</div>;
  }

  const price = card.clean_avg_value ?? card.price ?? null;
  const ebaySearchUrl = `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(
    `${card.card_name} ${card.card_number || ''}`
  )}&_ipg=240&_sop=12&_dmd=1&_sacat=0&LH_BIN=1&_trkparms=campaign%3D5339108925`;

  const lowerBound = price ? (price * 0.95).toFixed(2) : null;
  const upperBound = price ? (price * 1.05).toFixed(2) : null;

  return (
    <div className="flex flex-col items-start gap-6 rounded-xl bg-white p-6 shadow lg:flex-row border border-zinc-200 ring-1 ring-zinc-100">
      
      {/* COLUMN 1: CARD IMAGE */}
      <div className="w-[240px] rounded-lg bg-black p-2 sm:w-[320px] md:w-[360px]">
        <div className="overflow-hidden rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:rotate-1">
          <img
            src={card.card_image_url || '/placeholder.png'}
            alt={card.card_name}
            className="h-auto w-full rounded-xl"
          />
        </div>
      </div>

      {/* COLUMN 2: CARD DETAILS */}
      <div className="flex w-full max-w-[360px] flex-col gap-4 rounded-xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-4 shadow-sm ring-1 ring-zinc-100 text-sm text-zinc-800">
        <div className="relative rounded-xl border border-zinc-200 bg-white px-4 py-4 shadow-sm">
          <h1 className="text-2xl leading-tight font-extrabold text-zinc-800">{card.card_name}</h1>
          {card.set_logo_url && (
            <img
              src={card.set_logo_url}
              alt="Set Logo"
              className="mt-1 h-6 w-auto object-contain"
            />
          )}
          <img
            src={
              card.type
                ? `/Assets/icons/${card.type}.png`
                : '/Assets/icons/pokeball-icon-v2.png'
            }
            alt={card.type ? `${card.type} Type` : 'Pokémon Icon'}
            className="absolute top-[1.125rem] right-3 h-7 w-7 object-contain drop-shadow"
          />
        </div>

        <div className="space-y-2 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
          <h3 className="mb-1 text-sm font-semibold text-zinc-700">📦 Market Overview</h3>
          <div className="flex justify-between">
            <span>🗓️ Last Recorded Sale</span>
            <span>
              {card.sold_date
                ? new Date(card.sold_date).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : '–'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>🧾 Verified Sales Logged</span>
            <span>{typeof card.verified_sales_logged === 'number' ? card.verified_sales_logged : '–'}</span>
          </div>
          {typeof card.price_range_seen_min === 'number' && typeof card.price_range_seen_max === 'number' ? (
            <div className="flex justify-between">
              <span>💸 Price Range Seen</span>
              <span>
                £{card.price_range_seen_min.toFixed(2)}–£{card.price_range_seen_max.toFixed(2)}
              </span>
            </div>
          ) : (
            <div className="flex justify-between text-zinc-400 italic">
              <span>💸 Price Range Seen</span>
              <span>Not enough data</span>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-pink-200 bg-pink-100 px-4 py-3 shadow-sm">
          <p className="text-xs text-zinc-500">✨ PokéBinder Value Range</p>
          <p className="text-lg font-bold text-green-700">
            {lowerBound && upperBound ? `£${lowerBound} – £${upperBound}` : 'N/A'}
          </p>
          <p className="text-xs text-zinc-500">Based on verified sales & filtered listings</p>
        </div>

        <a
          href={ebaySearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 text-sm font-semibold text-white shadow hover:bg-red-700"
        >
          <img src="/Assets/logos/ebay logo.png" alt="eBay" className="h-8 w-8 object-contain" />
          <span>Buy Now on eBay</span>
        </a>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
          <details>
            <summary className="cursor-pointer font-medium">📊 How is this price calculated?</summary>
            <p className="mt-2 text-sm text-zinc-600">
              We filter slabs, bundles, and outliers to calculate a clean daily value. Only verified
              eBay sales are included.
            </p>
          </details>
        </div>
      </div>

      {/* COLUMN 3: PRO FEATURES + ACTIONS */}
      <div className="flex w-full max-w-[360px] flex-col gap-4 rounded-xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-4 shadow-sm ring-1 ring-zinc-100 text-sm text-zinc-800 relative">

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

          {showSignup ? (
            <div className="mt-3">
              <SignupPrompt />
            </div>
          ) : (
            <button
              onClick={() => setShowSignup(true)}
              className="mt-2 w-full rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700 text-sm font-medium shadow"
            >
              🔔 Notify Me
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
