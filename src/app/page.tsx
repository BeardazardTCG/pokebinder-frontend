import HomeClient from "@/components/HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PokéBinder | UK Pokémon Card Prices & Collector Tools",
  description: "Live UK Pokémon card prices, trends, and tools. Track values, get smart suggestions, and level up your binder with PokéBinder.",
  openGraph: {
    title: "PokéBinder | UK Pokémon Card Prices & Collector Tools",
    description: "Live UK Pokémon card prices, trends, and tools.",
    url: "https://www.pokebinder.co.uk",
    siteName: "PokéBinder",
    images: [
      {
        url: "https://www.pokebinder.co.uk/pokebinder-logo.png",
        width: 1200,
        height: 630,
        alt: "PokéBinder Logo Banner"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PokéBinder | UK Pokémon Card Prices & Collector Tools",
    description: "Live UK Pokémon card prices, trends, and tools.",
    images: ["https://www.pokebinder.co.uk/banner.png"],
  },
  alternates: {
    canonical: "https://www.pokebinder.co.uk",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
