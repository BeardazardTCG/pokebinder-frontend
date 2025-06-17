"use client";

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TopSocialBanner from '@/components/card/TopSocialBanner';
import FeaturedCards from '@/components/FeaturedCards';
import CardCatchTrackerBlock from '@/components/CardCatchTrackerBlock';
import SetLogoSlider from '@/components/SetLogoSlider';
import ComingSoonBlock from '@/components/ComingSoonBlock';
import Footer from '@/components/layout/Footer';

const funFacts = [
  "✨ Caught feelings, not just prices",
  "✨ PSA 10? More like PTSD 10.",
  "✨ Verified: Charizard still overrated",
  "✨ Not financial advice... but maybe?",
  "✨ Minty fresh, like your browsing history",
  "✨ Now 60% less eBay search rage!",
  "✨ We know what 'NM' *really* means",
  "✨ Built by humans, powered by obsession",
];

type SealedItem = {
  title: string;
  price: number;
  url: string;
  img: string | null;
};

export default function Home() {
  const [factIndex, setFactIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<SealedItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchSealed = async () => {
      try {
        const res = await fetch('/api/sealed');
        const json = await res.json();
        setItems(Array.isArray(json) ? json : []);
      } catch (err) {
        console.error('Failed to load sealed products:', err);
      }
    };
    fetchSealed();
  }, []);

  return (
    <>
      <Head>
        <title>PokéBinder | UK Pokémon Card Prices & Collector Tools</title>
        <meta name="description" content="Live UK Pokémon card prices, trends, and tools. Track values, get smart suggestions, and level up your binder with PokéBinder." />
        <meta property="og:title" content="PokéBinder | UK Pokémon Card Prices & Collector Tools" />
        <meta property="og:description" content="Live UK Pokémon card prices, trends, and tools." />
        <meta property="og:url" content="https://www.pokebinder.co.uk" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.pokebinder.co.uk/banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PokéBinder | UK Pokémon Card Prices & Collector Tools" />
        <meta name="twitter:description" content="Live UK Pokémon card prices, trends, and tools." />
        <meta name="twitter:image" content="https://www.pokebinder.co.uk/banner.png" />
        <link rel="canonical" href="https://www.pokebinder.co.uk" />
      </Head>

      <TopSocialBanner />

      <main className="flex flex-col items-center justify-center min-h-screen px-4 pb-12 space-y-6 bg-white text-black relative">
        <style>{`html, body { background-color: #fff; color: #000; color-scheme: light; }`}</style>

        <Link href="/feedback" className="fixed bottom-6 right-6 z-50 bg-pink-600 text-white px-4 py-2 rounded-full shadow-md hover:brightness-110 text-sm font-semibold">
          💬 Found a bug or idea?
        </Link>

        <div className="relative inline-block w-full max-w-[600px] mx-auto mt-4">
          <Image src="/pokebinder-logo.png" alt="PokeBinder Logo" width={540} height={540} className="w-[80%] max-w-[540px] mx-auto mb-2" />
          <Image src="/beta-testing.png" alt="Beta Stamp" width={140} height={40} className="absolute top-0 right-[-30px] rotate-[-12deg] z-30 hidden sm:block" />
          <Image src="/beta-testing.png" alt="Beta Badge Mobile" width={120} height={40} className="block sm:hidden mx-auto mt-[-20px] rotate-[-12deg] opacity-90 z-30" />
        </div>

        <div className="relative flex items-center w-[90%] max-w-[900px] -mt-4">
          <Image src="/pokeball-icon-v2.png" alt="Search Icon" width={28} height={28} className="absolute left-4 top-4" />
          <input
            type="text"
            name="search"
            placeholder="Search cards (e.g. Charizard EX)..."
            className="w-full pl-12 pr-24 py-4 text-lg rounded-[2rem] border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchTerm.trim()) {
                router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
              }
            }}
          />
          <Image src="/pikachu-cap.png" alt="Pikachu" width={140} height={140} className="absolute right-[-45px] top-[-16px] z-10 animate-bounce-slow" />
        </div>

        <div className="mt-2 text-sm text-gray-600 text-center">
          Try: <Link href="/card/g1-11" className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full text-xs sm:text-sm shadow hover:bg-blue-200 transition">Charizard EX</Link>,
          <Link href="/card/base1-10" className="ml-2 bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full text-xs sm:text-sm shadow hover:bg-blue-200 transition">Mewtwo</Link>
        </div>

        <div className="mt-3 text-sm sm:text-base text-yellow-700 bg-yellow-100 border border-yellow-300 px-4 py-2 rounded-full shadow text-center max-w-xs mx-auto min-h-[3rem] flex items-center justify-center text-balance text-wrap text-pretty">
          {funFacts[factIndex]}
        </div>

        <CardCatchTrackerBlock />

        <section className="w-full bg-[url('/Assets/bg/poke-pattern.png')] bg-repeat bg-[length:200px_auto] relative">
          <div className="h-2 bg-red-600" />
          <div className="max-w-6xl mx-auto px-4 py-6">
            <SetLogoSlider />
          </div>
          <div className="h-2 bg-red-600" />
        </section>

        <section className="w-full bg-[#e60012] py-8 px-4">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="flex items-center justify-center gap-3">
              <Image
                src="/pokebinder-logo.png"
                alt="PokéBinder Logo"
                width={40}
                height={40}
                className="rounded-full drop-shadow-md"
              />
              <h2 className="text-white text-2xl font-bold">PokéBinder Recommends</h2>
            </div>
            <p className="text-white text-sm opacity-80 mt-2">
              Clean picks from real UK sales — no bundles, no slabs, no fluff.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white via-orange-50 to-yellow-50 rounded-2xl shadow-lg max-w-6xl mx-auto px-4 py-6 md:px-6 md:py-6">
            <FeaturedCards />
          </div>

          <div className="w-full h-[6px] bg-white rounded-full mt-6"></div>
        </section>

        {/* ✅ SEALED PRODUCT BLOCK */}
        <section className="w-full max-w-6xl px-4 mt-12">
          <h2 className="text-lg font-bold text-yellow-600 mb-3">📦 Sealed Product Deals (Live from eBay)</h2>
          <div className="border border-yellow-300 bg-yellow-50 rounded-xl px-6 py-6 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 shadow-md text-center flex flex-col justify-between h-full hover:shadow-lg hover:scale-[1.01] transition-transform">
                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-32 object-contain mb-3"
                    />
                  )}
                  <p className="text-sm font-semibold mb-2 overflow-hidden text-ellipsis line-clamp-3 leading-snug text-gray-800 h-[4.5rem]">
                    {item.title}
                  </p>
                  <p className="text-green-700 font-bold text-lg mt-1">
                    £{item.price.toFixed(2)}
                  </p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-sm"
                  >
                    Buy on eBay
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ComingSoonBlock />
        <Footer />
      </main>
    </>
  );
}
