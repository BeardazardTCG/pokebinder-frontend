import React from "react";
import HalfCard from "@/components/card/HalfCard";
import Link from "next/link";

const decks = {
  Control: {
    Cheap: [
      {
        unique_id: "sv2-196",
        card_name: "Gardevoir ex",
        set_name: "Paldea Evolved",
        card_number: "196",
        clean_avg_value: 2.5,
        card_image_url: "https://images.pokemontcg.io/sv2/196.png",
        set_logo_url: "https://images.pokemontcg.io/sv2/logo.png",
        price_range_seen_min: 1.5,
        price_range_seen_max: 3.5
      },
      {
        unique_id: "swsh6-147",
        card_name: "Path to the Peak",
        set_name: "Chilling Reign",
        card_number: "147",
        clean_avg_value: 1.2,
        card_image_url: "https://images.pokemontcg.io/swsh6/147.png",
        set_logo_url: "https://images.pokemontcg.io/swsh6/logo.png",
        price_range_seen_min: 0.9,
        price_range_seen_max: 2.0
      }
    ],
    Balanced: [],
    Premium: []
  },
  Aggro: {
    Cheap: [],
    Balanced: [],
    Premium: []
  },
  Balanced: {
    Cheap: [],
    Balanced: [],
    Premium: []
  }
};

const DeckRow = ({ title, cards }: { title: string; cards: any[] }) => (
  <section className="mb-10">
    <h2 className="text-lg font-semibold text-zinc-800 mb-2">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {cards.map((card) => (
        <HalfCard key={card.unique_id} {...card} />
      ))}
    </div>
  </section>
);

export default function BattleDeckPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-zinc-900">
        Build Your Ultimate Battle Deck
      </h1>
      <p className="text-center text-zinc-600 mb-12 max-w-xl mx-auto">
        Explore competitive deck styles by strategy and budget. These aren’t just suggestions — they’re blueprints for victory.
      </p>

      {Object.entries(decks).map(([style, tiers]) => (
        <section key={style} className="mb-14">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">{style} Decks</h2>
          {Object.entries(tiers).map(([tier, cards]) => (
            <DeckRow
              key={`${style}-${tier}`}
              title={`${tier} ${style} Deck`}
              cards={cards}
            />
          ))}
        </section>
      ))}

      <div className="mt-16">
        <h2 className="text-xl font-bold mb-3 text-zinc-800">Watch Battle Tips 🎥</h2>
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/videoseries?list=PL0TpTfQswHUEzrL9OeV1xTxWDL7ZBtmyU"
            title="Pokémon Battle Tips"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </main>
  );
}
