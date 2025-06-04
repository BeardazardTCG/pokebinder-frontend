import Image from 'next/image';
import Link from 'next/link';

interface HalfCardProps {
  unique_id: string;
  card_name: string;
  set_name: string;
  card_number: string;
  card_image_url: string;
  clean_avg_value: number | null;
  price_range_seen_min: number | null;
  price_range_seen_max: number | null;
}

export default function HalfCard({
  unique_id,
  card_name,
  set_name,
  card_number,
  card_image_url,
  clean_avg_value,
  price_range_seen_min,
  price_range_seen_max,
}: HalfCardProps) {
  return (
    <Link
      href={`/card/${unique_id}`}
      className="w-full max-w-xl border rounded-2xl shadow p-4 flex items-center gap-4 transition hover:shadow-md bg-white"
    >
      <div className="relative w-24 h-32 flex-shrink-0">
        <Image
          src={card_image_url}
          alt={card_name}
          fill
          className="object-contain rounded-xl"
        />
      </div>
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-bold text-zinc-800 leading-tight">
            {card_name}
          </h3>
          <p className="text-sm text-zinc-600">
            {set_name} &bull; #{card_number}
          </p>
        </div>
        <div className="mt-2 text-sm text-zinc-700">
          {clean_avg_value !== null ? (
            <>
              <p className="font-semibold">
                🔥 Live Market Estimate: £{clean_avg_value.toFixed(2)}
              </p>
              {price_range_seen_min !== null && price_range_seen_max !== null && (
                <p className="text-xs text-zinc-500">
                  Range: £{price_range_seen_min.toFixed(2)}–£{price_range_seen_max.toFixed(2)}
                </p>
              )}
            </>
          ) : (
            <p className="italic text-zinc-400">No price data yet</p>
          )}
        </div>
      </div>
    </Link>
  );
}
