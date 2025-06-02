// src/app/card/[slug]/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { getCardFromDB } from '@/lib/db';
import FlagButton from '@/components/FlagButton';

export default async function CardPage({ params }: any) {
  const slug = params.slug;
  const card = await getCardFromDB(slug).catch(() => null);

  if (!card) {
    return <div className="p-8 text-red-600 text-xl">Card not found.</div>;
  }

  const safeQuery = `${card.card_name} ${card.card_number}`.replace(/[^a-zA-Z0-9\s-]/g, '');
  const affiliateUrl = `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(safeQuery)}&LH_BIN=1&LH_PrefLoc=1&_ex_kw=psa bundle lot&_in_kw=3&campid=5339108925`;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-1">
          {card.card_name} <span className="text-gray-500">#{card.card_number}</span>
        </h1>
        <p className="text-sm text-gray-500 italic mb-2">{card.set_name}</p>
        <div className="flex justify-center items-center gap-3">
          {card.set_symbol_url && <Image src={card.set_symbol_url} alt="Set Symbol" width={32} height={32} />}
          {card.set_logo_url && <Image src={card.set_logo_url} alt="Set Logo" width={120} height={36} />}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <Image
          src={card.card_image_url}
          alt={card.card_name || 'Card image'}
          width={400}
          height={560}
          className="rounded-xl shadow-xl mx-auto"
        />

        <div className="space-y-6">
          <div className="bg-green-50 border border-green-300 p-5 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-2">🔥 Live Market Estimate</h2>
            <p className="text-3xl font-extrabold text-green-700">
              £{card.price != null ? parseFloat(card.price).toFixed(2) : 'N/A'}
            </p>
            <p className="text-xs text-gray-600 mt-2 italic">
              Based on recent verified sales. No slabs, bundles, or outliers.
            </p>
            <FlagButton />
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
              <summary className="font-semibold cursor-pointer text-sm">How is this price calculated?</summary>
              <p className="text-xs text-gray-600 mt-2">
                We track verified eBay sales using strict filters. Median values are cleaned of slabs, job lots, damaged cards, and wild outliers. What you see is what the market’s actually paying.
              </p>
            </details>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 shadow">
            <h2 className="text-lg font-bold mb-1">🚀 Smart Suggestions (Coming Soon)</h2>
            <p className="text-sm text-gray-700">
              Bundling tips, sell timing, and AI-powered collector strategy — tailored per card.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 shadow">
            <h2 className="text-lg font-bold mb-1">📈 Price Trends (Pro)</h2>
            <p className="text-sm text-gray-700">
              See this card’s value over time and get notified on spikes or dips.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow">
            <h2 className="text-lg font-bold mb-1">🔄 Auto-List to eBay (Pro)</h2>
            <p className="text-sm text-gray-700">
              1-click relisting based on daily market shifts. Stay ahead, hands-free.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">🔍 More from {card.set_name}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white p-3 rounded-xl border shadow text-center">
              <Image src={card.card_image_url} alt="Similar Card" width={180} height={250} className="mx-auto" />
              <p className="text-xs text-gray-600 mt-2">Sample Card #{n}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}


