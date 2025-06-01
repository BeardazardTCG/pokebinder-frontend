// src/app/card/[slug]/page.tsx

import Image from 'next/image';
import { Metadata } from 'next';
import { getCardFromDB } from '@/lib/db';
import { useState } from 'react';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = params;
  const card = await getCardFromDB(slug).catch(() => null);

  if (!card) {
    return {
      title: 'Card Not Found | PokéBinder',
      description: 'No card data available.',
      openGraph: { images: [] },
    };
  }

  return {
    title: `${card.card_name} #${card.card_number} | PokéBinder`,
    description: `${card.set_name} – Live Market Tracker`,
    openGraph: {
      images: [card.card_image_url || ''],
    },
  };
}

export default async function CardPage({ params }: any) {
  const slug = params.slug;
  const card = await getCardFromDB(slug).catch(() => null);

  if (!card) {
    return <div className="p-8 text-red-600 text-xl">Card not found.</div>;
  }

  const safeQuery = `${card.card_name} ${card.card_number}`.replace(/[^a-zA-Z0-9\s-]/g, '');
  const affiliateUrl = `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(safeQuery)}&LH_BIN=1&LH_PrefLoc=1&_ex_kw=psa bundle lot&_in_kw=3&campid=5339108925`;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-1">
          {card.card_name} <span className="text-gray-500">#{card.card_number}</span>
        </h1>
        <p className="text-sm text-gray-500 italic mb-3">{card.set_name}</p>

        <div className="flex justify-center items-center gap-3">
          {card.set_symbol_url && <Image src={card.set_symbol_url} alt="Set Symbol" width={32} height={32} />}
          {card.set_logo_url && <Image src={card.set_logo_url} alt="Set Logo" width={120} height={36} />}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Image
          src={card.card_image_url || '/placeholder.png'}
          alt={card.card_name || 'Card image'}
          width={400}
          height={560}
          className="rounded-xl shadow-xl mx-auto"
        />

        <div className="space-y-6">
          <div className="bg-green-50 border border-green-300 p-5 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-2">🔥 Live Market Estimate</h2>
            <p className="text-3xl font-extrabold text-green-700">
              £{card.price != null ? card.price.toFixed(2) : 'N/A'}
            </p>
            <p className="text-xs text-gray-600 mt-2 italic">
              Based on clean median eBay sales — excludes slabs, bundles, and outliers.
            </p>
            <button
              className="mt-4 text-xs text-gray-500 hover:text-red-600 underline underline-offset-2"
              onClick={() => alert('Thanks for flagging! We’ll review this shortly.')}
            >
              ⚠️ Flag an issue with this card
            </button>
          </div>

          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-red-600 hover:bg-red-700 text-white text-lg text-center py-3 rounded-xl font-bold shadow-md transition"
          >
            Buy Now on eBay 🔗
          </a>

          <div className="bg-white border border-gray-300 rounded-xl p-5 shadow">
            <details>
              <summary className="font-semibold cursor-pointer text-sm">How do we calculate this price?</summary>
              <p className="text-xs text-gray-600 mt-2">
                We track real eBay sales using strict keyword filters. Median price is calculated after removing slabs, bundles, damaged cards, and extreme outliers. This gives a clean daily average of what collectors are actually paying.
              </p>
            </details>
          </div>

          <div className="bg-gray-100 border border-gray-300 rounded-xl p-5 shadow opacity-60">
            <h2 className="text-lg font-bold mb-1">📈 Price Trend Chart (Pro)</h2>
            <p className="text-sm text-gray-700">Track this card’s price over time. Coming soon with PokéBinder Pro.</p>
          </div>

          <div className="bg-gray-100 border border-gray-300 rounded-xl p-5 shadow opacity-60">
            <h2 className="text-lg font-bold mb-1">🔍 Live Listings Table (Pro)</h2>
            <p className="text-sm text-gray-700">See current listings, lowest price, match quality. Available with Pro plan.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
