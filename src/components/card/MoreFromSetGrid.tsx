'use client';

import Image from 'next/image';
import Link from 'next/link';

type Card = {
  card_name: string;
  card_number: string;
  card_image_url: string;
  unique_id: string;
  price: number | null;
};

type Props = {
  setName: string;
  cards: Card[];
};

export default function MoreFromSetGrid({ setName, cards }: Props) {
  return (
    <div className="mt-12 text-center">
      <h2 className="text-2xl font-bold mb-6">🔍 More from {setName}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <Link
            href={`/card/${card.unique_id}`}
            key={i}
            className="bg-white p-4 rounded-xl border shadow hover:scale-[1.02] transition text-center"
          >
            <Image
              src={card.card_image_url}
              alt={`${card.card_name} #${card.card_number}`}
              width={180}
              height={250}
              className="mx-auto mb-2"
            />
            <p className="text-sm font-medium text-zinc-800 leading-tight">
              {card.card_name} #{card.card_number}
            </p>
            <p className="text-xs text-green-600 mt-1">
              {card.price ? `£${card.price.toFixed(2)}` : 'No price yet'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}


