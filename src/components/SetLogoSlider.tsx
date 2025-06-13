"use client";

import useSWR from 'swr';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SetLogo {
  set_id: string;
  set_name: string;
  image: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function SetLogoSlider() {
  const { data: sets = [], error } = useSWR<SetLogo[]>('/api/latestsets', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 5 * 60 * 1000, // 5 minutes
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const amount = direction === 'left' ? -400 : 400;
    containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-6xl px-4 mt-16">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600 inline-block pb-1">
          <span className="mr-2 opacity-70">📂</span>Browse by Set
        </h2>
      </div>

      <div className="relative bg-slate-50 border border-gray-100 rounded-xl px-4 py-6 shadow-sm">
        <button
          onClick={() => scroll('left')}
          className="absolute top-1/2 -translate-y-1/2 left-0 z-10 px-2 py-1 bg-white/70 hover:bg-white rounded-r-md shadow"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          ref={containerRef}
          className="hover:overflow-x-auto overflow-x-hidden scroll-smooth no-scrollbar px-6"
          style={{ maxHeight: '360px' }}
        >
          {!sets.length ? (
            <div className="text-sm text-zinc-400 italic px-2">Loading sets...</div>
          ) : (
            <div className="flex flex-wrap content-start gap-x-6 gap-y-8 w-max py-2">
              {sets.map((set) => (
                <Link
                  key={set.set_id}
                  href={`/set/${set.set_id}`}
                  className="flex flex-col items-center justify-start w-[110px]"
                  title={set.set_name}
                >
                  <div className="w-[100px] h-[100px] overflow-hidden bg-white">
                    <Image
                      src={set.image}
                      alt={set.set_name}
                      width={100}
                      height={100}
                      className="object-scale-down p-1 w-full h-full"
                    />
                  </div>
                  <span className="block mt-1 text-xs text-center text-gray-700 leading-tight w-full line-clamp-2">
                    {set.set_name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute top-1/2 -translate-y-1/2 right-0 z-10 px-2 py-1 bg-white/70 hover:bg-white rounded-l-md shadow"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
