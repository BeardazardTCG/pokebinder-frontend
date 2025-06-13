"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SetLogo {
  set_id: string;
  set_name: string;
  image: string;
}

export default function SetLogoSlider() {
  const [sets, setSets] = useState<SetLogo[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchSets() {
      try {
        const res = await fetch('/api/latestsets');
        const data = await res.json();
        setSets(data);
      } catch (err) {
        console.error("Failed to load sets:", err);
      }
    }
    fetchSets();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const amount = direction === 'left' ? -400 : 400;
    containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-6xl px-4 mt-12">
      <h2 className="text-lg font-bold text-blue-600 mb-4">📂 Browse by Set</h2>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 h-full px-2 bg-gradient-to-r from-white to-transparent"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div
          ref={containerRef}
          className="overflow-x-auto scroll-smooth no-scrollbar px-8"
        >
          <div className="grid grid-flow-col auto-cols-max gap-6 py-2" style={{ gridAutoRows: 'auto' }}>
            {sets.map((set) => (
              <Link
                key={set.set_id}
                href={`/set/${set.set_id}`}
                className="flex flex-col items-center justify-start w-[110px]"
              >
                <div className="w-[100px] h-[100px] overflow-hidden bg-white">
                  <Image
                    src={set.image}
                    alt={set.set_name}
                    width={100}
                    height={100}
                    className="object-contain w-full h-full"
                  />
                </div>
                <span className="block mt-1 text-xs text-center text-gray-700 leading-tight">
                  {set.set_name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 z-10 h-full px-2 bg-gradient-to-l from-white to-transparent"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
