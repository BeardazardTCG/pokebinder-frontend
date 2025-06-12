"use client";

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
      const res = await fetch('/api/latestsets');
      const data = await res.json();
      setSets(data);
    }
    fetchSets();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const amount = direction === 'left' ? -200 : 200;
    containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-6xl px-4 mt-12">
      <h2 className="text-lg font-bold text-blue-600 mb-3">🗂 Browse by Set</h2>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-10 h-full px-2 bg-gradient-to-r from-white to-transparent"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div
          ref={containerRef}
          className="overflow-x-auto whitespace-nowrap no-scrollbar scroll-smooth px-8"
        >
          {sets.map((set) => (
            <Link
              key={set.set_id}
              href={`/set/${set.set_id}`}
              className="inline-block text-center mx-2"
            >
              <div className="w-20 h-20 rounded-full border border-gray-300 overflow-hidden shadow-sm hover:shadow-md bg-white">
                <Image
                  src={set.image}
                  alt={set.set_name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <span className="block text-xs mt-1 text-gray-700 truncate max-w-[80px]">
                {set.set_name}
              </span>
            </Link>
          ))}
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
