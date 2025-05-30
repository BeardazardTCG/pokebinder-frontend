// /src/app/search/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data, error, isLoading } = useSWR(
    query ? `/api/search?q=${encodeURIComponent(query)}` : null,
    fetcher
  );

  if (!query) {
    return (
      <div className="p-8 text-red-600 text-xl text-center">
        No search term provided.
        <div className="mt-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error)
    return <div className="p-8 text-red-600 text-xl">Search failed. Please try again later.</div>;

  const cards = data?.cards || [];

  if (cards.length === 0) {
    return (
      <div className="p-8 text-red-600 text-xl text-center">
        No search results here.
        <div className="mt-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Results for “{query}”</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card: any) => (
          <Link
            key={card.unique_id}
            href={`/card/${card.unique_id}`}
            className="group border rounded-xl p-3 shadow hover:shadow-lg transition"
          >
            <Image
              src={card.card_image_url}
              alt={card.card_name}
              width={200}
              height={280}
              className="mx-auto rounded"
            />
            <div className="mt-3 text-sm text-center">
              <div className="font-semibold">{card.card_name}</div>
              <div className="text-gray-500">#{card.card_number}</div>
              <div className="flex justify-center items-center mt-1 space-x-2 text-xs">
                <Image
                  src={card.set_logo_url}
                  alt={card.set_name}
                  width={24}
                  height={24}
                />
                <span>{card.set_name}</span>
              </div>
              <div className="mt-1 text-green-600 font-medium">
                {card.sold_ebay_median
                  ? `£${parseFloat(card.sold_ebay_median).toFixed(2)}`
                  : "No recent price"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
