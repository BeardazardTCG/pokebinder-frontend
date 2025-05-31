import Image from 'next/image';
import { Metadata } from 'next';
import { getCardFromDB } from '@/lib/db';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = params;
  const card = await getCardFromDB(slug).catch(() => null);

  if (!card) {
    return {
      title: 'Card Not Found | CardCatch',
      description: 'No card data available.',
      openGraph: { images: [] },
    };
  }

  return {
    title: `${card.card_name} ${card.card_number} | CardCatch`,
    description: card.set_name || '',
    openGraph: {
      images: [card.card_image_url || ''],
    },
  };
}

export default async function CardPage(props: any) {
  const slug = props.params.slug;
  const card = await getCardFromDB(slug).catch(() => null);

  if (!card) {
    return <div className="p-8 text-red-600 text-xl">Card not found.</div>;
  }

  // ✅ FINAL: Clean search URL with campid, no rover
  const safeQuery = `${card.card_name} ${card.card_number}`.replace(/[^a-zA-Z0-9\s-]/g, '');
  const affiliateUrl = `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(
    safeQuery
  )}&LH_BIN=1&LH_PrefLoc=1&_ex_kw=psa bundle lot&_in_kw=3&campid=5339108925`;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {card.card_name} <span className="text-gray-500">#{card.card_number}</span>
        </h1>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          {card.set_symbol_url && (
            <Image src={card.set_symbol_url} alt="Set Symbol" width={32} height={32} />
          )}
          {card.set_logo_url && (
            <Image src={card.set_logo_url} alt="Set Logo" width={120} height={36} />
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <Image
          src={card.card_image_url || '/placeholder.png'}
          alt={card.card_name || 'Card image'}
          width={400}
          height={560}
          className="rounded-xl shadow-xl mx-auto"
        />

        <div className="space-y-6">
          <p className="text-2xl font-semibold text-green-700">
            🔥 Live Market Estimate: £{card.price != null ? card.price.toFixed(2) : 'N/A'}
          </p>

          <a
            href={affiliateUrl}
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-lg px-5 py-2 rounded-lg font-bold transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Now on eBay
          </a>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow">
            <h2 className="text-lg font-bold mb-1">🧠 Smart Suggestions (Coming Soon)</h2>
            <p className="text-sm text-gray-700">
              Get recommended bundles, insights, and collecting strategies from live data and market trends.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 shadow">
            <h2 className="text-lg font-bold mb-1">📊 Trend Tracker</h2>
            <p className="text-sm text-gray-700">
              Track this card’s value over time and get notified on spikes, dips, or trend shifts.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 shadow">
            <h2 className="text-lg font-bold mb-1">🚀 Upcoming Premium Tools</h2>
            <ul className="text-sm text-gray-700 list-disc list-inside mt-2 space-y-1">
              <li>🔧 Bundle Builder – auto-suggest card combinations to sell together</li>
              <li>⚙️ Auto-List to eBay – 1-click daily relisting based on price shifts</li>
              <li>🧪 Deck Optimizer – rank your cards for competitive play</li>
              <li>🌍 Global Arbitrage – uncover price gaps across regions</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

