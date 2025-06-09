import Image from 'next/image';
import Link from 'next/link';

interface HalfCardProps {
  unique_id: string;
  card_name: string;
  card_number: string;
  set_name: string;
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
  card_image_url,
  clean_avg_value,
  price_range_seen_min,
  price_range_seen_max,
}: HalfCardProps) {
  const setLogoUrl = `https://cdn.pokebinder.co.uk/set-logos/${set_name.replace(/\s+/g, '-').toLowerCase()}.png`;

  return (
    <Link
      href={`/card/${unique_id}`}
      className="group block rounded-3xl border border-zinc-200 bg-gradient-to-br from-white via-orange-50 to-yellow-50 shadow-sm hover:shadow-xl hover:border-orange-300 transition duration-200 overflow-hidden"
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

        <div className="mt-4 w-full text-center">
          <h3 className="text-base font-bold leading-tight text-zinc-800 group-hover:text-orange-700 transition truncate">
            {card_name}
          </h3>

          <div className="flex justify-center items-center gap-2 mt-1">
            <Image
              src={setLogoUrl}
              alt={set_name}
              width={22}
              height={22}
              className="object-contain drop-shadow-sm"
            />
            <p className="text-xs text-zinc-500 font-medium">#{card_number}</p>
          </div>

          {clean_avg_value !== null && (
            <div className="mt-2 text-orange-600 font-semibold text-sm">
              🔥 Live Market Estimate: £{clean_avg_value.toFixed(2)}
            </div>
          )}

          {price_range_seen_min !== null && price_range_seen_max !== null && (
            <p className="text-[11px] text-zinc-400 mt-1">
              Range: £{price_range_seen_min.toFixed(2)}–£{price_range_seen_max.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
