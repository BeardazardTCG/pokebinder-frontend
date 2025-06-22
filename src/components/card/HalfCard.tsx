import Image from 'next/image';
import Link from 'next/link';

interface HalfCardProps {
  unique_id: string;
  card_name: string;
  card_number: string;
  set_name: string;
  set_logo_url: string | null;
  card_image_url: string;
  clean_avg_value: number | null;
  price_range_seen_min: number | null;
  price_range_seen_max: number | null;
}

export default function HalfCard({
  unique_id,
  card_name,
  card_number,
  set_name,
  set_logo_url,
  card_image_url,
  clean_avg_value,
  price_range_seen_min,
  price_range_seen_max,
}: HalfCardProps) {
  return (
    <Link
      <Link href={`/cards/${card_name.toLowerCase()}/${set_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}/${card_number}`}
      className="group block rounded-3xl border border-zinc-200 bg-gradient-to-br from-white via-orange-50 to-yellow-50 shadow-sm hover:shadow-xl hover:border-orange-300 transition duration-200 overflow-hidden w-full max-w-[240px] h-full"
    >
      <div className="flex flex-col justify-between h-full p-4 text-center">
        {/* Image */}
        <div className="bg-black p-2 rounded-lg shadow-sm">
          <Image
            src={card_image_url}
            alt={card_name}
            width={200}
            height={280}
            className="object-contain rounded-md"
          />
        </div>

        {/* Card Info */}
        <div className="mt-4 flex flex-col flex-grow justify-between">
          <h3 className="text-lg font-extrabold leading-snug text-zinc-800 group-hover:text-orange-700 transition break-words min-h-[2.5rem]">
            {card_name}
          </h3>

          {/* Set Logo + Card Number (Stacked) */}
          <div className="flex flex-col items-center mt-2 mb-2">
            {set_logo_url ? (
              <Image
                src={set_logo_url}
                alt={set_name}
                width={36}
                height={36}
                className="object-contain drop-shadow-sm mb-1"
              />
            ) : (
              <span className="text-xs text-zinc-400 italic mb-1">No Logo</span>
            )}
            <p className="text-[13px] text-zinc-600 font-semibold">#{card_number}</p>
          </div>

          {/* Live Estimate */}
          {clean_avg_value !== null && (
            <div className="text-[15px] text-red-600 font-bold mt-1">
              🔥 £{clean_avg_value.toFixed(2)}
            </div>
          )}

          {/* Price Range */}
          {price_range_seen_min !== null && price_range_seen_max !== null && (
            <p className="text-xs text-zinc-500 mt-0.5">
              Range: £{price_range_seen_min.toFixed(2)}–£{price_range_seen_max.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
