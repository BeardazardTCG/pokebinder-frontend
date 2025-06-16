import React from "react";
import HalfCard from "@/components/card/HalfCard";
import Link from "next/link";

const mockCards = [
  {
    unique_id: "sv9-183",
    card_name: "Iono's Bellibolt ex",
    set_name: "Journey Together",
    card_number: "183",
    clean_avg_value: 11.11,
    image_url: "https://images.pokemontcg.io/sv9/183.png"
  },
  {
    unique_id: "swsh2-208",
    card_name: "Tool Scrapper",
    set_name: "Rebel Clash",
    card_number: "208",
    clean_avg_value: 4.09,
    image_url: "https://images.pokemontcg.io/swsh2/208.png"
  },
  {
    unique_id: "ex10-!",
    card_name: "Unown",
    set_name: "Unseen Forces",
    card_number: "!",
    clean_avg_value: 12.52,
    image_url: "https://images.pokemontcg.io/ex10/28.png"
  }
];

const DeckRow = ({ title }: { title: string }) => (
  <section className="mb-8">
    <h2 className="text-xl font-bold text-zinc-800 mb-2">{title}</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {mockCards.map((card) => (
        <HalfCard key={card.unique_id} {...card} />
      ))}
    </div>
  </section>
);

export default function BattleDeckPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-zinc-900">
        Build Your Ultimate Battle Deck
      </h1>
      <p className="text-center text-zinc-600 mb-10">
        Explore themed decks by budget — quick picks to get you started.
      </p>

      <DeckRow title="💸 Cheap Deck Picks" />
      <DeckRow title="⚖️ Balanced Deck Picks" />
      <DeckRow title="🔥 Premium Deck Picks" />

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-3 text-zinc-800">Watch Battle Tips 🎥</h2>
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/videoseries?list=PLkz9o3L3RyG02VXrCK5-HjowYZzU8q0_7"
            title="Pokémon Battle Tips"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </main>
  );
}
