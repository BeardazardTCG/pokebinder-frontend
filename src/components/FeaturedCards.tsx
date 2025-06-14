"use client";

import useSWR from 'swr';
import HalfCard from '@/components/card/HalfCard';

const fetcher = (url: string) => fetch(url).then(res => res.json());

type Card = {
  unique_id: string;
  card_name: string;
  card_number: string;
  set_name: string;
  set_logo_url: string | null;
  card_image_url: string;
  clean_avg_value: string | number | null;
  price_range_seen_min: string | number | null;
  price_range_seen_max: string | number | null;
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

  if (!data) {
    return <div className="p-4 text-gray-500">Loading featured cards...</div>;
  }

  if (Array.isArray(data.cards) && data.cards.length === 0) {
    return (
      <div className="p-4 text-yellow-600 font-medium">
        No hot cards to feature right now — check back soon!
      </div>
    );
  }

  const visibleCards = data.cards
    .filter((card) => card && card.card_image_url && card.card_name)
    .slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {visibleCards.map((card) => (
        <HalfCard
          key={card.unique_id}
          unique_id={card.unique_id}
          card_name={card.card_name}
          card_number={card.card_number}
          set_name={card.set_name}
          set_logo_url={card.set_logo_url}
          card_image_url={card.card_image_url}
          clean_avg_value={card.clean_avg_value != null ? Number(card.clean_avg_value) : null}
          price_range_seen_min={card.price_range_seen_min != null ? Number(card.price_range_seen_min) : null}
          price_range_seen_max={card.price_range_seen_max != null ? Number(card.price_range_seen_max) : null}
        />
      ))}
    </div>
  );
}
