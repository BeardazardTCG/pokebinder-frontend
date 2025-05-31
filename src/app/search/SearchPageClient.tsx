"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SearchPageClient() {
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
    return (
      <div className="p-8 text-red-600 text-xl text-center">
        Search failed. Please try again later.
      </div>
    );

  const cards = data?.cards || [];

  if (cards.length === 0) {
    return (
      <div className="p-8 text-red-600 text-xl text-center">
        No search results found.
        <div className="mt-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-800">
        Results for “<span className="italic text-black/80">{query}</span>”
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card: any) => (
          <Link
            key={card.unique_id}
            href={`/card/${card.unique_id}`}
            className="group border rounded-xl p-3 shadow hover:shadow-lg hover:border-blue-400 transition bg-white hover:bg-gray-50"
          >
            <Image
              src={card.card_image_url}
              alt={card.card_name}
              width={240}
              height={340}
              className="mx-auto rounded-xl shadow-sm group-hover:scale-[1.02] transition"
            />
            <div className="mt-3 text-sm text-center">
              <div className="font-bold text-gray-900 truncate">{card.card_name}</div>
              <div className="text-gray-500 text-xs">#{card.card_number}</div>

              <div className="flex justify-center items-center mt-1 gap-1 text-xs text-gray-600">
                {card.set_logo_url && (
                  <Image
                    src={card.set_logo_url}
                    alt={card.set_name}
                    width={22}
                    height={22}
                  />
                )}
                <span className="truncate">{card.set_name}</span>
              </div>

              <div className="mt-1 font-semibold text-sm">
                {card.sold_ebay_median ? (
                  <span className="text-green-700">£{parseFloat(card.sold_ebay_median).toFixed(2)}</span>
                ) : (
                  <span className="text-gray-400 italic">No recent price</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
