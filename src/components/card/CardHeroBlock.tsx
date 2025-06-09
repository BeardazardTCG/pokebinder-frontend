// src/components/card/CardHeroBlock.tsx

'use client';

import Image from 'next/image';

type Props = {
  cardName: string;
  cardNumber: string;
  setName: string;
  setLogoUrl?: string;
  cardImageUrl: string;
  rarityLabel?: string; // e.g. '⭐ PROMO'
};

export default function CardHeroBlock({
  cardName,
  cardNumber,
  setName,
  setLogoUrl,
  cardImageUrl,
  rarityLabel,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
      {/* Card Image with tilt + badge */}
      <div className="relative group w-[240px] sm:w-[320px] md:w-[360px]">
        <div className="transition-transform duration-300 group-hover:rotate-1 group-hover:scale-105 rounded-xl shadow-xl overflow-hidden">
          <Image
            src={cardImageUrl}
            alt={cardName}
            width={360}
            height={504}
            className="w-full h-auto rounded-xl"
          />
        </div>
        {rarityLabel && (
          <div className="absolute top-2 left-2 bg-yellow-300 text-xs font-bold px-2 py-1 rounded shadow text-zinc-800">
            {rarityLabel}
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="text-center md:text-left space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-800">
          {cardName} <span className="text-zinc-400 text-xl font-medium">#{cardNumber}</span>
        </h1>
        <p className="text-sm text-zinc-500 italic">{setName}</p>
        {setLogoUrl && (
          <div className="mt-2 flex justify-center md:justify-start">
            <Image src={setLogoUrl} alt="Set Logo" width={120} height={36} />
          </div>
        )}
      </div>
    </div>
  );
}
