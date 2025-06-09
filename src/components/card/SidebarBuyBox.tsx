'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface EbayItem {
  title: string;
  price: string;
  url: string;
  image: string;
}

interface Props {
  query: string;
  side: 'left' | 'right';
}

export default function SidebarBuyBox({ query, side }: Props) {
  const [items, setItems] = useState<EbayItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEbayItems() {
      try {
        const ebayQuery = encodeURIComponent(query);
        const res = await fetch(`/api/ebay/active?q=${ebayQuery}`);
        const data = await res.json();
        setItems(data.items || []);
      } catch (err) {
        console.error('SidebarBuyBox fetch failed:', err);
      } finally {
        setLoading(false);
      }
    }

    if (query.trim().length > 0) {
      fetchEbayItems();
    }
  }, [query]);

  if (loading || !query.trim()) return null;
  if (items.length === 0) return null;

  return (
    <aside className="sticky top-20 space-y-4">
      <div className="bg-white border border-orange-200 rounded-xl p-4 shadow-sm text-sm w-full max-w-[240px]">
        <h4 className="font-semibold text-orange-600 mb-3">
          🔥 Live eBay Listings
        </h4>
        {items.slice(0, 4).map((item, i) => (
          <a
            key={i}
            href={`${item.url}&campid=5339108925`}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-3 hover:opacity-90 transition"
          >
            <div className="flex items-center gap-2">
              <Image
                src={item.image}
                alt={item.title}
                width={50}
                height={50}
                className="object-contain rounded-sm border border-zinc-200 bg-white"
              />
              <div className="flex-1">
                <p className="text-xs font-medium text-zinc-700 leading-tight line-clamp-2">
                  {item.title}
                </p>
                <p className="text-xs text-green-600 font-bold mt-0.5">
                  £{item.price}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </aside>
  );
}
