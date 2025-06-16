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
        price_range_seen_max: 3.5,
        ebay_url: "https://www.ebay.co.uk/itm/1234567890",
        role: "Main Attacker"
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
        price_range_seen_max: 2.0,
        ebay_url: "https://www.ebay.co.uk/itm/0987654321",
        role: "Trainer"
      }
    ],
    Balanced: [
      {
        unique_id: "sv1-165",
        card_name: "Miraidon ex",
        set_name: "Scarlet & Violet",
        card_number: "165",
        clean_avg_value: 7.8,
        card_image_url: "https://images.pokemontcg.io/sv1/165.png",
        set_logo_url: "https://images.pokemontcg.io/sv1/logo.png",
        price_range_seen_min: 6.5,
        price_range_seen_max: 9.5,
        ebay_url: "https://www.ebay.co.uk/itm/2468101214",
        role: "Main Attacker"
      }
    ],
    Premium: [
      {
        unique_id: "swsh12-186",
        card_name: "Lugia VSTAR",
        set_name: "Silver Tempest",
        card_number: "186",
        clean_avg_value: 19.0,
        card_image_url: "https://images.pokemontcg.io/swsh12/186.png",
        set_logo_url: "https://images.pokemontcg.io/swsh12/logo.png",
        price_range_seen_min: 16.0,
        price_range_seen_max: 22.0,
        ebay_url: "https://www.ebay.co.uk/itm/3141592653",
        role: "Main Attacker"
      }
    ]
  },
  Aggro: {
    Cheap: [
      {
        unique_id: "swsh8-44",
        card_name: "Zacian V",
        set_name: "Celebrations",
        card_number: "044",
        clean_avg_value: 3.0,
        card_image_url: "https://images.pokemontcg.io/swsh8/44.png",
        set_logo_url: "https://images.pokemontcg.io/swsh8/logo.png",
        price_range_seen_min: 2.5,
        price_range_seen_max: 4.5,
        ebay_url: "https://www.ebay.co.uk/itm/1122334455",
        role: "Main Attacker"
      }
    ],
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
            src="https://www.youtube.com/embed/videoseries?list=PL0TpTfQswHTX8u8GJcXt-7DDQYm9qNSlm"
            title="Pokémon Battle Tips"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </main>
  );
}
