import React from "react";
import HalfCard from "@/components/card/HalfCard";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

interface DeckCard {
  unique_id: string;
  card_name: string;
  set_name: string;
  card_number: string;
  clean_avg_value: number;
  card_image_url: string;
  set_logo_url: string;
  price_range_seen_min: number;
  price_range_seen_max: number;
  ebay_url: string;
  role: string;
}

async function fetchDecks() {
  const res = await fetch("/api/battle-decks");
  if (!res.ok) throw new Error("Failed to fetch decks");
  return res.json();
}

const DeckRow = ({ title, cards }: { title: string; cards: DeckCard[] }) => (
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

export default async function BattleDeckPage() {
  const decks = await fetchDecks();

  return (
    <>
      <Header />
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
            {Object.entries(tiers as Record<string, DeckCard[]>).map(([tier, cards]) => (
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
              src="https://www.youtube.com/embed/8cbHjCWZZn0?si=P0nw5tph8BA1VC4m"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
