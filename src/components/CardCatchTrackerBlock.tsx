'use client';

import LiveScrapeStats from './LiveScrapeStats';
import Image from 'next/image';

export default function CardCatchTrackerBlock() {
  return (
    <section className="w-full bg-[#3B4CCA] py-12 px-4 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Live Tracker */}
        <LiveScrapeStats />

        {/* Right: CardCatch Text */}
        <div className="text-white space-y-4 text-base md:text-lg leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold">
            Inside PokéBinder lives CardCatch
          </h2>
          <p>
            PokéBinder runs on CardCatch — our custom engine built from scratch.
            <br />
            <br />
            It pulls sold listings, live prices, and daily trends from across eBay, TCGPlayer, and beyond.
            <br />
            <br />
            Every source is filtered, cleaned, and checked — no bundles, no slabs, no fluff.
            <br />
            <br />
            What you see here isn't a guess. It's the real UK market, tracked live, for collectors like us.
          </p>
        </div>
      </div>

      {/* Divider with PokéBinder logo */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <div className="h-[5px] bg-yellow-400 w-full max-w-[160px] rounded" />
        <Image
          src="/Assets/logos/pokebinder-logo.png"
          alt="PokéBinder Logo"
          width={60}
          height={60}
        />
        <div className="h-[5px] bg-yellow-400 w-full max-w-[160px] rounded" />
      </div>
    </section>
  );
}
