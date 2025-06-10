// FILE: /src/components/card/SidebarBuyBox.tsx

'use client';

import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface Props {
  query: string;
  side: 'left' | 'right';
}

export default function SidebarBuyBox({ query, side }: Props) {
  if (!query.trim()) return null;

  // Clean and enhance query with basic refinements
  const refinedQuery = query
    .toLowerCase()
    .replace(/\b(promo|lot|bundle|psa|proxy)\b/g, '')
    .replace(/\s+/g, ' ') // normalize spacing
    .trim() + ' card';

  const ebayUrl = `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(
    refinedQuery
  )}&_sop=1&_ipg=50&_in_kw=4&LH_BIN=1&rt=nc&LH_PrefLoc=1&campid=5339108925`;

  return (
    <aside className="sticky top-20">
      <div className="bg-white border-2 border-orange-200 rounded-3xl p-5 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out w-full max-w-[240px] group">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-orange-700 text-sm tracking-wide flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-orange-500" /> eBay Buy Now
          </h4>
          <Image src="/Assets/icons/ebay.webp" alt="eBay" width={24} height={24} />
        </div>

        <p className="text-xs text-zinc-600 leading-snug mb-4">
          Browse current Buy It Now listings for <strong className="text-zinc-800">{query}</strong>.
        </p>

        <a
          href={ebayUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-bold text-center px-4 py-2 rounded-2xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200 ease-in-out group-hover:translate-y-[-1px] border border-orange-600"
        >
          🛒 View on eBay
        </a>
      </div>
    </aside>
  );
}
