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
    <header className="w-full border-b border-zinc-200 bg-white py-4 px-4 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Assets/logos/pokebinder-logo.png" alt="PokéBinder" width={160} height={160} className="w-[140px] md:w-[180px] h-auto" />
          <span className="text-xl md:text-2xl font-bold tracking-tight">PokéBinder</span>
        </Link>

        {/* Center: Search + Character */}
        <div className="flex items-center justify-center gap-3 w-full max-w-3xl px-2 md:px-4">
          <form onSubmit={handleSearch} className="flex flex-grow relative">
            {/* Pokéball Icon */}
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <Image src="/Assets/icons/pokeball-icon-v2.png" alt="Search Icon" width={22} height={22} />
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search cards..."
              className="w-full pl-10 pr-4 py-2.5 rounded-l-full border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2.5 rounded-r-full font-bold text-sm"
            >
              Search
            </button>
          </form>
          <Image
            src={`/Assets/characters/${character}`}
            alt="Mascot"
            width={50}
            height={50}
            className="rounded-full hidden md:block"
          />
        </div>

        {/* Right: Fun fact + BETA tag */}
        <div className="flex flex-col items-end justify-center gap-1 text-right leading-tight pt-1 pr-1 min-w-[140px] md:min-w-[160px]">
          <div className="text-[10px] bg-yellow-200 text-yellow-900 font-bold px-2 py-1 rounded shadow rotate-[-6deg]">
            BETA TEST
          </div>
          <div className="text-[10px] md:text-[11px] italic text-pink-600 font-medium max-w-[140px] md:max-w-[150px]">
            {funFact}
          </div>
        </div>
      </div>
    </header>
  );
}
