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
      href={`/card/${unique_id}`}
      className="group block rounded-3xl border border-zinc-200 bg-gradient-to-br from-white via-orange-50 to-yellow-50 shadow-sm hover:shadow-xl hover:border-orange-300 transition duration-200 overflow-hidden w-full max-w-[240px]"
    >
      <div className="flex flex-col items-center p-4">
        <div className="bg-white p-1 rounded-xl border border-zinc-100 shadow group-hover:shadow-md">
          <Image
            src={card_image_url}
            alt={card_name}
            width={200}
            height={280}
            className="object-contain rounded-md drop-shadow-sm"
          />
        </div>

        <div className="mt-3 w-full text-center">
          <h3 className="text-base font-bold leading-snug text-zinc-800 group-hover:text-orange-700 transition break-words min-h-[2.5rem]">
            {card_name}
          </h3>

          {set_logo_url ? (
            <div className="mt-2 mb-1 flex justify-center">
              <Image
                src={set_logo_url}
                alt={set_name}
                width={48}
                height={48}
                className="object-contain drop-shadow-sm"
              />
            </div>
          ) : (
            <div className="mt-2 mb-1 text-xs text-zinc-400 italic">No Logo</div>
          )}

          <p className="text-sm text-zinc-600 font-medium mb-1">#{card_number}</p>

          {clean_avg_value !== null && (
            <div className="text-orange-600 font-semibold text-sm mt-1">
              🔥 Live Market Estimate: £{clean_avg_value.toFixed(2)}
            </div>
          )}

          {price_range_seen_min !== null && price_range_seen_max !== null && (
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Range: £{price_range_seen_min.toFixed(2)}–£{price_range_seen_max.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
