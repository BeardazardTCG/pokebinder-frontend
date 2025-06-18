import React from "react";
import HalfCard from "@/components/card/HalfCard";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

const baseDeck = [
  {
    unique_id: "sv2-196",
    card_name: "Gardevoir ex",
    set_name: "Paldea Evolved",
    card_number: "196",
    clean_avg_value: 11.5,
    card_image_url: "https://images.pokemontcg.io/sv2/196.png",
    set_logo_url: "https://images.pokemontcg.io/sv2/logo.png",
    price_range_seen_min: 9.0,
    price_range_seen_max: 14.0,
    ebay_url: "https://www.ebay.co.uk/itm/1234567890",
    role: "Main Attacker"
  },
  {
    unique_id: "swsh12-68",
    card_name: "Kirlia",
    set_name: "Silver Tempest",
    card_number: "068",
    clean_avg_value: 0.8,
    card_image_url: "https://images.pokemontcg.io/swsh12/68.png",
    set_logo_url: "https://images.pokemontcg.io/swsh12/logo.png",
    price_range_seen_min: 0.6,
    price_range_seen_max: 1.2,
    ebay_url: "https://www.ebay.co.uk/itm/2345678901",
    role: "Draw Support"
  },
  {
    unique_id: "swsh12-74",
    card_name: "Cresselia",
    set_name: "Silver Tempest",
    card_number: "074",
    clean_avg_value: 1.0,
    card_image_url: "https://images.pokemontcg.io/swsh12/74.png",
    set_logo_url: "https://images.pokemontcg.io/swsh12/logo.png",
    price_range_seen_min: 0.7,
    price_range_seen_max: 1.5,
    ebay_url: "https://www.ebay.co.uk/itm/3456789012",
    role: "Secondary Attacker"
  },
  {
    unique_id: "sv2-179",
    card_name: "Iono",
    set_name: "Paldea Evolved",
    card_number: "179",
    clean_avg_value: 6.2,
    card_image_url: "https://images.pokemontcg.io/sv2/179.png",
    set_logo_url: "https://images.pokemontcg.io/sv2/logo.png",
    price_range_seen_min: 5.0,
    price_range_seen_max: 7.5,
    ebay_url: "https://www.ebay.co.uk/itm/4561237890",
    role: "Disruption Trainer"
  },
  {
    unique_id: "swsh6-140",
    card_name: "Fog Crystal",
    set_name: "Chilling Reign",
    card_number: "140",
    clean_avg_value: 0.7,
    card_image_url: "https://images.pokemontcg.io/swsh6/140.png",
    set_logo_url: "https://images.pokemontcg.io/swsh6/logo.png",
    price_range_seen_min: 0.4,
    price_range_seen_max: 1.0,
    ebay_url: "https://www.ebay.co.uk/itm/5678901234",
    role: "Setup / Search"
  },
  {
    unique_id: "swsh9-129",
    card_name: "Rare Candy",
    set_name: "Crown Zenith",
    card_number: "129",
    clean_avg_value: 0.6,
    card_image_url: "https://images.pokemontcg.io/swsh9/129.png",
    set_logo_url: "https://images.pokemontcg.io/swsh9/logo.png",
    price_range_seen_min: 0.3,
    price_range_seen_max: 1.0,
    ebay_url: "https://www.ebay.co.uk/itm/6789012345",
    role: "Evolution Support"
  }
];

type DeckCard = typeof baseDeck[number];

function applyPriceMod(deck: DeckCard[], mod: number): DeckCard[] {
  return deck.map(card => ({
    ...card,
    clean_avg_value: parseFloat((card.clean_avg_value + mod).toFixed(2))
  }));
}

const decks = {
  Control: {
    Cheap: baseDeck,
    Balanced: applyPriceMod(baseDeck, 4),
    Premium: applyPriceMod(baseDeck, 9)
  },
  Aggro: {
    Cheap: [
      {
        unique_id: "sv3-215",
        card_name: "Charizard ex",
        set_name: "Obsidian Flames",
        card_number: "215",
        clean_avg_value: 16.5,
        card_image_url: "https://images.pokemontcg.io/sv3/215.png",
        set_logo_url: "https://images.pokemontcg.io/sv3/logo.png",
        price_range_seen_min: 14.0,
        price_range_seen_max: 18.0,
        ebay_url: "https://www.ebay.co.uk/itm/0000000001",
        role: "Main Attacker"
      },
      {
        unique_id: "sv2-166",
        card_name: "Arven",
        set_name: "Paldea Evolved",
        card_number: "166",
        clean_avg_value: 1.2,
        card_image_url: "https://images.pokemontcg.io/sv2/166.png",
        set_logo_url: "https://images.pokemontcg.io/sv2/logo.png",
        price_range_seen_min: 1.0,
        price_range_seen_max: 1.5,
        ebay_url: "https://www.ebay.co.uk/itm/0000000002",
        role: "Support Trainer"
      },
      {
        unique_id: "sv3-25",
        card_name: "Charmander",
        set_name: "Obsidian Flames",
        card_number: "025",
        clean_avg_value: 0.7,
        card_image_url: "https://images.pokemontcg.io/sv3/25.png",
        set_logo_url: "https://images.pokemontcg.io/sv3/logo.png",
        price_range_seen_min: 0.5,
        price_range_seen_max: 1.0,
        ebay_url: "https://www.ebay.co.uk/itm/0000000003",
        role: "Setup Basic"
      },
      {
        unique_id: "swsh12-150",
        card_name: "Ultra Ball",
        set_name: "Silver Tempest",
        card_number: "150",
        clean_avg_value: 0.8,
        card_image_url: "https://images.pokemontcg.io/swsh12/150.png",
        set_logo_url: "https://images.pokemontcg.io/swsh12/logo.png",
        price_range_seen_min: 0.6,
        price_range_seen_max: 1.1,
        ebay_url: "https://www.ebay.co.uk/itm/0000000004",
        role: "Search Trainer"
      },
      {
        unique_id: "swsh12-132",
        card_name: "Boss's Orders",
        set_name: "Silver Tempest",
        card_number: "132",
        clean_avg_value: 2.4,
        card_image_url: "https://images.pokemontcg.io/swsh12/132.png",
        set_logo_url: "https://images.pokemontcg.io/swsh12/logo.png",
        price_range_seen_min: 2.0,
        price_range_seen_max: 3.0,
        ebay_url: "https://www.ebay.co.uk/itm/0000000005",
        role: "Disruptor"
      },
      {
        unique_id: "swsh9-129",
        card_name: "Rare Candy",
        set_name: "Crown Zenith",
        card_number: "129",
        clean_avg_value: 0.6,
        card_image_url: "https://images.pokemontcg.io/swsh9/129.png",
        set_logo_url: "https://images.pokemontcg.io/swsh9/logo.png",
        price_range_seen_min: 0.3,
        price_range_seen_max: 1.0,
        ebay_url: "https://www.ebay.co.uk/itm/0000000006",
        role: "Evolution Support"
      }
    ],
    Balanced: applyPriceMod(baseDeck, 1.5),
    Premium: applyPriceMod(baseDeck, 5)
  },
  Balanced: {
    Cheap: [
      {
        unique_id: "sv1-81",
        card_name: "Miraidon ex",
        set_name: "Scarlet & Violet Base",
        card_number: "081",
        clean_avg_value: 8.4,
        card_image_url: "https://images.pokemontcg.io/sv1/81.png",
        set_logo_url: "https://images.pokemontcg.io/sv1/logo.png",
        price_range_seen_min: 7.0,
        price_range_seen_max: 10.0,
        ebay_url: "https://www.ebay.co.uk/itm/0000000010",
        role: "Main Attacker"
      },
      {
        unique_id: "swsh12-58",
        card_name: "Regieleki VMAX",
        set_name: "Silver Tempest",
        card_number: "058",
        clean_avg_value: 4.5,
        card_image_url: "https://images.pokemontcg.io/swsh12/58.png",
        set_logo_url: "https://images.pokemontcg.io/swsh12/logo.png",
        price_range_seen_min: 3.5,
        price_range_seen_max: 5.5,
        ebay_url: "https://www.ebay.co.uk/itm/0000000011",
        role: "Damage Booster"
      },
      {
        unique_id: "swsh9-55",
        card_name: "Flaaffy",
        set_name: "Evolving Skies",
        card_number: "055",
        clean_avg_value: 1.0,
        card_image_url: "https://images.pokemontcg.io/swsh7/55.png",
        set_logo_url: "https://images.pokemontcg.io/swsh7/logo.png",
        price_range_seen_min: 0.8,
        price_range_seen_max: 1.4,
        ebay_url: "https://www.ebay.co.uk/itm/0000000012",
        role: "Energy Engine"
      },
      {
        unique_id: "swsh11-147",
        card_name: "Professor's Research",
        set_name: "Lost Origin",
        card_number: "147",
        clean_avg_value: 0.9,
        card_image_url: "https://images.pokemontcg.io/swsh11/147.png",
        set_logo_url: "https://images.pokemontcg.io/swsh11/logo.png",
        price_range_seen_min: 0.6,
        price_range_seen_max: 1.2,
        ebay_url: "https://www.ebay.co.uk/itm/0000000013",
        role: "Draw Support"
      },
      {
        unique_id: "sv1-167",
        card_name: "Beach Court",
        set_name: "Scarlet & Violet Base",
        card_number: "167",
        clean_avg_value: 1.4,
        card_image_url: "https://images.pokemontcg.io/sv1/167.png",
        set_logo_url: "https://images.pokemontcg.io/sv1/logo.png",
        price_range_seen_min: 1.0,
        price_range_seen_max: 2.0,
        ebay_url: "https://www.ebay.co.uk/itm/0000000014",
        role: "Retreat Engine"
      },
      {
        unique_id: "sv1-170",
        card_name: "Electric Generator",
        set_name: "Scarlet & Violet Base",
        card_number: "170",
        clean_avg_value: 0.5,
        card_image_url: "https://images.pokemontcg.io/sv1/170.png",
        set_logo_url: "https://images.pokemontcg.io/sv1/logo.png",
        price_range_seen_min: 0.3,
        price_range_seen_max: 0.8,
        ebay_url: "https://www.ebay.co.uk/itm/0000000015",
        role: "Energy Acceleration"
      }
    ],
    Balanced: applyPriceMod(baseDeck, 2),
    Premium: applyPriceMod(baseDeck, 6)
  }
};

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

export default function BattleDeckPage() {
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
