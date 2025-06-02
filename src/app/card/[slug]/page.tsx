// /src/app/card/[slug]/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { getCardFromDB } from '@/lib/db';
import FlagButton from '@/components/FlagButton';
import BaseLayout from '@/components/layout/BaseLayout';

export default async function CardPage({ params }: any) {
  const slug = params.slug;
  const card = await getCardFromDB(slug).catch(() => null);

  if (!card) {
    return (
      <BaseLayout>
        <div className="p-8 text-red-600 text-xl">Card not found.</div>
      </BaseLayout>
    );
  }

  const safeQuery = `${card.card_name} ${card.card_number}`.replace(/[^a-zA-Z0-9\s-]/g, '');
  const affiliateUrl = `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(safeQuery)}&LH_BIN=1&LH_PrefLoc=1&_ex_kw=psa bundle lot&_in_kw=3&campid=5339108925`;

  return (
    <BaseLayout>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
            {card.card_name} <span className="text-zinc-500">#{card.card_number}</span>
          </h1>
          <p className="text-sm text-zinc-500 italic mt-2">{card.set_name}</p>
          <div className="flex justify-center items-center gap-3 mt-4">
            {card.set_symbol_url && <Image src={card.set_symbol_url} alt="Set Symbol" width={32} height={32} />}
            {card.set_logo_url && <Image src={card.set_logo_url} alt="Set Logo" width={120} height={36} />}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <Image
              src={card.card_image_url}
              alt={card.card_name || 'Card image'}
              width={500}
              height={700}
              className="rounded-xl shadow mx-auto"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold text-green-900 mb-1">🔥 Live Market Estimate</h2>
              <p className="text-4xl font-extrabold text-green-700">
                £{card.price != null ? parseFloat(card.price).toFixed(2) : 'N/A'}
              </p>
              <p className="text-xs text-gray-600 mt-2 italic">
                Based on verified recent sales. No slabs, bundles, or outliers.
              </p>
              <div className="mt-3">
                <FlagButton />
              </div>
            </div>

            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-red-600 hover:bg-red-700 text-white text-lg text-center py-4 rounded-xl font-bold shadow-md transition"
            >
              🛍️ Buy Now on eBay
            </a>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow">
              <details>
                <summary className="font-semibold cursor-pointer text-sm">📊 How is this price calculated?</summary>
                <p className="text-xs text-gray-600 mt-2">
                  Our market engine filters out slabs, bundles, damage, and extreme outliers. What you're seeing is a clean median based on real collector-grade listings.
                </p>
              </details>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 shadow">
              <h2 className="text-lg font-bold mb-1">🚀 Smart Suggestions (Coming Soon)</h2>
              <p className="text-sm text-gray-700">
                Discover smart bundle tips, sell timing cues, and collector insights for this card.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 shadow">
              <h2 className="text-lg font-bold mb-1">📈 Price Trends (Pro)</h2>
              <p className="text-sm text-gray-700">
                Track value changes over time. Spike alerts and historical pricing coming soon.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow">
              <h2 className="text-lg font-bold mb-1">🔄 Auto-List to eBay (Pro)</h2>
              <p className="text-sm text-gray-700">
                Connect your listing account for hands-free daily relisting based on current market value.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">🔍 More from {card.set_name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white p-4 rounded-xl border shadow text-center hover:shadow-md transition">
                <Image src={card.card_image_url} alt="Similar Card" width={180} height={250} className="mx-auto rounded" />
                <p className="text-xs text-gray-600 mt-2">Sample Card #{n}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </BaseLayout>
  );
}


