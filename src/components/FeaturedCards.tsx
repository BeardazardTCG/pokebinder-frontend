"use client";

import { useEffect, useState } from 'react';
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

const FEATURED_CACHE_KEY = 'pb_featured_cards';
const FEATURED_CACHE_TTL = 15 * 60 * 1000; // 15 minutes

export default function FeaturedCards() {
  const { data, error } = useSWR<{ cards: Card[] }>('/api/featured', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: true,
    revalidateOnFocus: false,
  });

  const [visibleCards, setVisibleCards] = useState<Card[]>([]);

  useEffect(() => {
    if (!data?.cards || !Array.isArray(data.cards)) return;

    const cacheRaw = localStorage.getItem(FEATURED_CACHE_KEY);
    const cache = cacheRaw ? JSON.parse(cacheRaw) : null;
    const now = Date.now();

    if (
      cache &&
      Array.isArray(cache.cards) &&
      typeof cache.timestamp === 'number' &&
      now - cache.timestamp < FEATURED_CACHE_TTL
    ) {
      setVisibleCards(cache.cards);
    } else {
      const shuffled = [...data.cards]
        .filter((card) => card && card.card_image_url && card.card_name)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      setVisibleCards(shuffled);
      localStorage.setItem(
        FEATURED_CACHE_KEY,
        JSON.stringify({ cards: shuffled, timestamp: now })
      );
    }
  }, [data]);

  if (error) {
    return <div className="p-4 text-red-500">Failed to load featured cards.</div>;
  }

  if (!data) {
    return <div className="p-4 text-gray-500">Loading featured cards...</div>;
  }

  if (visibleCards.length === 0) {
    return (
      <div className="p-4 text-yellow-600 font-medium">
        No hot cards to feature right now — check back soon!
      </div>
    );
  }

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
          clean_avg_value={
            card.clean_avg_value != null ? Number(card.clean_avg_value) : null
          }
          price_range_seen_min={
            card.price_range_seen_min != null ? Number(card.price_range_seen_min) : null
          }
          price_range_seen_max={
            card.price_range_seen_max != null ? Number(card.price_range_seen_max) : null
          }
        />
      ))}
    </div>
  );
}
