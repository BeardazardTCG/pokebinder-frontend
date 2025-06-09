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
    <Link href={`/card/${unique_id}`} className="block rounded-2xl border border-zinc-300 bg-white shadow hover:shadow-md transition duration-200 overflow-hidden">
      <div className="flex flex-col items-center p-4">
        <Image
          src={card_image_url}
          alt={card_name}
          width={200}
          height={280}
          className="object-contain rounded-xl border border-zinc-200 shadow-sm"
        />
        <div className="mt-4 w-full text-center">
          <h3 className="text-lg font-bold leading-tight text-zinc-800 truncate">
            {card_name}
          </h3>
          <div className="flex justify-center items-center gap-2 mt-1">
            <Image
              src={setLogoUrl}
              alt={set_name}
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="text-sm text-zinc-500">#{card_number}</p>
          </div>
          {clean_avg_value !== null && (
            <div className="mt-2 text-orange-600 font-semibold text-base">
              🔥 Live Market Estimate: £{clean_avg_value.toFixed(2)}
            </div>
          )}
          {(price_range_seen_min !== null && price_range_seen_max !== null) && (
            <p className="text-xs text-zinc-400">
              Range: £{price_range_seen_min.toFixed(2)}–£{price_range_seen_max.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

