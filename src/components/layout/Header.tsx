'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const characters = [
  'blastoise.png',
  'charizard.png',
  'charmander.png',
  'clefairy.png',
  'eevee.png',
  'gengar.png',
  'mew.png',
  'mewtwo.png',
  'pikachu.png',
  'snorlax.png',
  'squirtle.png',
  'umbreon.png'
];

const funFacts = [
  '✨ We know what "NM" *really* means',
  '✨ PSA 10? More like PTSD 10.',
  '✨ Not financial advice... but maybe?',
  '✨ Built by collectors. Powered by obsession.',
  '✨ Do you like milltank?.',
  '✨ Should I auction it or Buy It Now.',
  '✨ Food or Pokemon Cards? mmm.',
];

export default function Header() {
  const [character, setCharacter] = useState('snorlax.png');
  const [funFact, setFunFact] = useState(funFacts[0]);
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  useEffect(() => {
    const charIndex = Math.floor(Math.random() * characters.length);
    const factIndex = Math.floor(Math.random() * funFacts.length);
    setCharacter(characters[charIndex]);
    setFunFact(funFacts[factIndex]);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <header className="w-full border-b border-zinc-200 bg-white py-5 px-6 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Assets/logos/pokebinder-logo.png" alt="PokéBinder" width={100} height={100} />
          <span className="text-2xl font-bold tracking-tight">PokéBinder</span>
        </Link>

        {/* Center: Search + Character */}
        <div className="flex items-center justify-center gap-3 flex-grow max-w-3xl px-4">
          <form onSubmit={handleSearch} className="flex flex-grow max-w-3xl relative">
            {/* Pokéball Icon */}
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <Image src="/Assets/icons/pokeball-icon-v2.png" alt="Search Icon" width={25} height={25} />
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search cards..."
              className="flex-grow pl-10 pr-4 py-2.5 rounded-l-full border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-r-full font-bold text-sm"
            >
              Search
            </button>
          </form>
          <Image
            src={`/Assets/characters/${character}`}
            alt="Mascot"
            width={60}
            height={60}
            className="rounded-full mt-1"
          />
        </div>

        {/* Right: Fun fact + BETA tag */}
        <div className="flex flex-col items-end justify-center gap-1 min-w-[160px] text-right leading-tight pt-1 pr-1">
          <div className="text-[10px] bg-yellow-200 text-yellow-900 font-bold px-2 py-1 rounded shadow rotate-[-6deg]">
            BETA TEST
          </div>
          <div className="text-[11px] italic text-pink-600 font-medium max-w-[150px]">
            {funFact}
          </div>
        </div>
      </div>
    </header>
  );
}
