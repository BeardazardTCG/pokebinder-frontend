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

type SealedItem = {
  title: string;
  price: number;
  url: string;
  img: string | null;
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<SealedItem[]>([]);
  const router = useRouter();

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

        <div className="text-center mt-2 sm:mt-4 px-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Know What Your Pokémon Cards Are Worth
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            PokéBinder tracks live UK prices from real eBay and TCG sales — cleaned, trusted, updated daily.
          </p>
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

        <section className="w-full bg-[url('/Assets/bg/poke-pattern.png')] bg-repeat bg-[length:200px_auto]">
          <div className="h-2 bg-red-600" />
          <div className="max-w-6xl mx-auto text-center px-4 py-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              What PokéBinder Pro Unlocks
            </h2>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {["Smart Suggestions","Trend Tracker","Auto-Listing Tool","Bundle Builder","Grading AI","Language Unifier"].map((tool, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center px-4 py-6 border rounded-xl bg-white shadow-sm hover:shadow-md transition relative"
                >
                  <span className="absolute top-3 right-3 text-[10px] font-bold bg-red-500 text-white px-2 py-1 rounded-full shadow">PRO</span>
                  <h3 className="font-semibold text-gray-900 text-lg">{tool}</h3>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/pro-tools" className="bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-semibold shadow hover:bg-yellow-300">
                Learn More & Join Early Access
              </Link>
            </div>
          </div>
          <div className="h-2 bg-red-600" />
        </section>

        <CardCatchTrackerBlock />
        <section className="w-full bg-[url('/Assets/bg/poke-pattern.png')] bg-repeat bg-[length:200px_auto] relative">
          <div className="h-2 bg-red-600" />
          <div className="max-w-6xl mx-auto px-4 py-6">
            <SetLogoSlider />
          </div>
          <div className="h-2 bg-red-600" />
        </section>

        <FeaturedCards />
        <ComingSoonBlock />
        <Footer />
      </main>
    </>
  );
}
