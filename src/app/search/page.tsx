import SearchClient from "@/components/SearchClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Results | PokéBinder",
  description: "See live market prices and listings for your favourite Pokémon cards.",
  openGraph: {
    title: "Search Results | PokéBinder",
    description: "See live market prices and listings for your favourite Pokémon cards.",
    url: "https://www.pokebinder.co.uk/search",
    siteName: "PokéBinder",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Results | PokéBinder",
    description: "See live market prices and listings for your favourite Pokémon cards.",
  },
};

export default function SearchPage() {
  return <SearchClient />;
}
