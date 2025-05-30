'use client';

import useSWR from 'swr';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then(res => res.json());

type Card = {
  unique_id: string;
  card_image_url: string;
  card_name: string;
  card_number: string | number;
  set_logo_url?: string | null;
  set_name?: string;
  clean_avg_value?: string | number | null;
  url_used?: string;
};

export default function FeaturedCards() {
  const { data, error } = useSWR<{ cards: Card[] }>('/api/featured', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnFocus: true,
  });

  if (error) {
    return <div className="p-4 text-red-500">Failed to load featured cards.</div>;
  }

  if (!data || !Array.isArray(data.cards)) {
    return <div className="p-4 text-gray-500">Loading featured cards...</div>;
  }

  const visibleCards = data.cards
    .filter((card) => card && card.card_image_url && card.card_name)
    .slice(0, 4); // show 4 cards max

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full">
      {visibleCards.map((card) => (
        <div
          key={card.unique_id}
          className="bg-white w-full rounded-2xl shadow-md hover:shadow-xl transition-all p-6 text-center flex flex-col items-center"
        >
          <Image
            src={card.card_image_url}
            alt={card.card_name}
            width={200}
            height={280}
            className="rounded object-contain mb-4"
            unoptimized
          />
          <p className="font-mono text-base text-gray-700 mb-1">#{card.card_number}</p>

          {card.set_logo_url && !card.set_logo_url.includes("null") ? (
            <Image
              src={card.set_logo_url}
              alt={`${card.set_name} logo`}
              width={90}
              height={30}
              className="mb-3"
            />
          ) : (
            <p className="mb-3 text-xs italic text-gray-400">[No set logo]</p>
          )}

          <p className="text-green-600 font-bold text-xl mb-3">
            {card.clean_avg_value != null && !isNaN(Number(card.clean_avg_value))
              ? `£${Number(card.clean_avg_value).toFixed(2)}`
              : '£—'}
          </p>

          {card.url_used && (
            <a
              href={card.url_used}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-md shadow-md text-sm font-semibold bg-yellow-300 text-black hover:bg-yellow-400 transition-all"
            >
              🛒 Buy Now
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
