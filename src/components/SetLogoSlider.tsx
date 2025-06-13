"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SetLogo {
  set_id: string;
  set_name: string;
  image: string;
}

export default function SetLogoSlider() {
  const [sets, setSets] = useState<SetLogo[]>([]);

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

  return (
    <section className="w-full max-w-6xl px-4 mt-12">
      <h2 className="text-lg font-bold text-blue-600 mb-4">📂 Browse by Set</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {sets.map((set) => (
          <Link
            key={set.set_id}
            href={`/set/${set.set_id}`}
            className="text-center hover:scale-[1.05] transition-transform"
          >
            <div className="w-20 h-20 mx-auto rounded-full border border-gray-300 overflow-hidden shadow-sm bg-white">
              <Image
                src={set.image}
                alt={set.set_name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <span className="block mt-2 text-xs text-gray-700 truncate max-w-[80px] mx-auto">
              {set.set_name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
