// FILE: /src/components/card/SidebarBuyBox.tsx

'use client';

interface Props {
  query: string;
  side: 'left' | 'right';
}

export default function SidebarBuyBox({ query, side }: Props) {
  if (!query.trim()) return null;

  const ebayUrl = `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(
    query
  )}&_sop=1&_ipg=50&_in_kw=4&LH_BIN=1&rt=nc&LH_PrefLoc=1&campid=5339108925`;

  return (
    <aside className="sticky top-20">
      <div className="bg-white border border-orange-200 rounded-xl p-4 shadow-sm text-sm w-full max-w-[240px]">
        <h4 className="font-semibold text-orange-600 mb-3">
          🔍 eBay Buy Now
        </h4>
        <p className="text-sm text-zinc-600 mb-4">
          Browse current Buy It Now listings for <strong>{query}</strong>.
        </p>
        <a
          href={ebayUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl shadow hover:bg-orange-600 transition"
        >
          🛒 View on eBay
        </a>
      </div>
    </aside>
  );
}
