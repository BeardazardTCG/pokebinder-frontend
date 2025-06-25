"use client";

import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SetLogo {
  set_id: string;
  set_name: string;
  image: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SetLogoSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sets, setSets] = useState<SetLogo[]>([]);

  useEffect(() => {
    const loadSets = async () => {
      try {
        const res = await fetch('/api/latestsets');
        if (res.ok) {
          const data: SetLogo[] = await res.json();

          // 🌟 FEATURED SETS TO PREPEND
          const featuredSets: SetLogo[] = [
            {
              set_id: 'mcd18',
              set_name: "McDonald's 2018 Promo",
              image: '/Assets/sets/mcd18.webp',
            },
            {
              set_id: 'mcd21',
              set_name: "McDonald's 2021 Promo",
              image: '/Assets/sets/mcd21.webp',
            },
            {
              set_id: 'base',
              set_name: "Base Set (Original)",
              image: '/Assets/sets/base.webp',
            },
          ];

          // 🧼 Merge featured + live API sets
          setSets([...featuredSets, ...data]);
        } else {
          console.error('Failed to fetch /api/latestsets');
        }
      } catch (err) {
        console.error('Error loading sets:', err);
      }
    };
    loadSets();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const amount = direction === 'left' ? -400 : 400;
    containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="w-full bg-[url('/poke-pattern.png')] bg-repeat bg-center bg-contain px-4 mt-[-2px] pb-8">
      <div className="relative max-w-6xl mx-auto px-2">
        <button
          onClick={() => scroll('left')}
          className="absolute top-1/2 -translate-y-1/2 left-0 z-10 px-2 py-1 bg-white/80 hover:bg-white rounded-r-md shadow"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={containerRef}
          className="hover:overflow-x-auto overflow-x-hidden scroll-smooth no-scrollbar px-6"
        >
          {!sets.length ? (
            <div className="text-sm text-zinc-400 italic px-2">Loading sets...</div>
          ) : (
            <div className="flex flex-nowrap gap-6 py-2">
              {sets.map((set) => (
                <Link
                  key={set.set_id}
                  href={`/set/${set.set_id}`}
                  className="flex flex-col items-center justify-start w-[140px] flex-shrink-0"
                  title={set.set_name}
                >
                  <div className="w-[140px] h-[140px] rounded-lg bg-white border border-gray-200 shadow-sm p-2 hover:scale-[1.05] transition">
                    <Image
                      src={set.image}
                      alt={set.set_name}
                      width={130}
                      height={130}
                      className="object-scale-down w-full h-full"
                    />
                  </div>
                  <span className="block mt-2 text-xs text-center text-gray-700 leading-tight w-full line-clamp-2">
                    {set.set_name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute top-1/2 -translate-y-1/2 right-0 z-10 px-2 py-1 bg-white/80 hover:bg-white rounded-l-md shadow"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
