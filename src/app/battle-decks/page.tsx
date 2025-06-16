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
      },
      {
        unique_id: "sv4-103",
        card_name: "Manaphy",
        set_name: "Brilliant Stars",
        card_number: "41",
        clean_avg_value: 1.0,
        card_image_url: "https://images.pokemontcg.io/swsh9/41.png",
        set_logo_url: "https://images.pokemontcg.io/swsh9/logo.png",
        price_range_seen_min: 0.6,
        price_range_seen_max: 1.2,
        ebay_url: "https://www.ebay.co.uk/itm/1123581321",
        role: "Support"
      },
      {
        unique_id: "sv3-176",
        card_name: "Boss's Orders",
        set_name: "Obsidian Flames",
        card_number: "176",
        clean_avg_value: 1.7,
        card_image_url: "https://images.pokemontcg.io/sv3/176.png",
        set_logo_url: "https://images.pokemontcg.io/sv3/logo.png",
        price_range_seen_min: 1.2,
        price_range_seen_max: 2.0,
        ebay_url: "https://www.ebay.co.uk/itm/6677889900",
        role: "Disruptor"
      },
      {
        unique_id: "sv2-179",
        card_name: "Iono",
        set_name: "Paldea Evolved",
        card_number: "179",
        clean_avg_value: 2.9,
        card_image_url: "https://images.pokemontcg.io/sv2/179.png",
        set_logo_url: "https://images.pokemontcg.io/sv2/logo.png",
        price_range_seen_min: 2.0,
        price_range_seen_max: 3.9,
        ebay_url: "https://www.ebay.co.uk/itm/4561237890",
        role: "Trainer"
      },
      {
        unique_id: "sv3-182",
        card_name: "Rare Candy",
        set_name: "Obsidian Flames",
        card_number: "182",
        clean_avg_value: 0.8,
        card_image_url: "https://images.pokemontcg.io/sv3/182.png",
        set_logo_url: "https://images.pokemontcg.io/sv3/logo.png",
        price_range_seen_min: 0.5,
        price_range_seen_max: 1.0,
        ebay_url: "https://www.ebay.co.uk/itm/7412589630",
        role: "Setup"
      }
    ],
    Balanced: [...Array(6)].map((_, i) => ({ ...decks.Control.Cheap[i], clean_avg_value: decks.Control.Cheap[i].clean_avg_value + 4 })),
    Premium: [...Array(6)].map((_, i) => ({ ...decks.Control.Cheap[i], clean_avg_value: decks.Control.Cheap[i].clean_avg_value + 9 }))
  },
  Aggro: {
    Cheap: [...Array(6)].map((_, i) => ({ ...decks.Control.Cheap[i], clean_avg_value: decks.Control.Cheap[i].clean_avg_value - 1 })),
    Balanced: [...Array(6)].map((_, i) => ({ ...decks.Control.Cheap[i], clean_avg_value: decks.Control.Cheap[i].clean_avg_value + 1.5 })),
    Premium: [...Array(6)].map((_, i) => ({ ...decks.Control.Cheap[i], clean_avg_value: decks.Control.Cheap[i].clean_avg_value + 5 }))
  },
  Balanced: {
    Cheap: [...Array(6)].map((_, i) => ({ ...decks.Control.Cheap[i], clean_avg_value: decks.Control.Cheap[i].clean_avg_value + 0.2 })),
    Balanced: [...Array(6)].map((_, i) => ({ ...decks.Control.Cheap[i], clean_avg_value: decks.Control.Cheap[i].clean_avg_value + 2 })),
    Premium: [...Array(6)].map((_, i) => ({ ...decks.Control.Cheap[i], clean_avg_value: decks.Control.Cheap[i].clean_avg_value + 6 }))
  }
};

const DeckRow = ({ title, cards }: { title: string; cards: any[] }) => (
  <section className="mb-12 bg-yellow-50 p-4 rounded-xl shadow">
    <h2 className="text-lg font-semibold text-zinc-800 mb-2">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div key={card.unique_id}>
          <HalfCard {...card} />
          <p className="text-center text-sm text-zinc-500 mt-1 italic">{card.role}</p>
        </div>
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
            src="https://www.youtube.com/embed/1BOyGpEJfEo"
            title="Pokémon Battle Tips"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </main>
  );
}
