import Image from 'next/image';
import { Metadata } from 'next';
import { getCardFromDB } from '@/lib/db';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const card = await getCardFromDB(slug).catch(() => null);

  if (!card) {
    return {
      title: 'Card Not Found | CardCatch',
      description: 'No card data available.',
      openGraph: { images: [] },
    };
  }

  return {
    title: `${card.card_name} ${card.card_number} | CardCatch`,
    description: card.set_name || '',
    openGraph: {
      images: [card.card_image_url || ''],
    },
  };
}

export default async function CardPage(props: any) {
  const slug = props.params.slug;
  const card = await getCardFromDB(slug).catch(() => null);

  if (!card) {
    return <div className="p-8 text-red-600 text-xl">Card not found.</div>;
  }

  const baseUrl = `https://www.ebay.co.uk/sch/i.html?_nkw=${encodeURIComponent(
    card.card_name + ' ' + card.card_number
  )}`;
  const affiliateUrl = `https://rover.ebay.com/rover/1/711-53200-19255-0/1?ff3=4&pub=5575564066&toolid=10001&campid=5339108925&customid=${encodeURIComponent(
    card.card_name
  )}-${card.card_number}&mpre=${encodeURIComponent(baseUrl)}`;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {card.card_name} ({card.card_number})
      </h1>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Image
          src={card.card_image_url || '/placeholder.png'}
          alt={card.card_name || 'Card image'}
          width={400}
          height={560}
          className="rounded-xl shadow-lg mx-auto"
        />

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {card.set_symbol_url && (
              <Image src={card.set_symbol_url} alt="Set Symbol" width={40} height={40} />
            )}
            {card.set_logo_url && (
              <Image src={card.set_logo_url} alt="Set Logo" width={140} height={40} />
            )}
          </div>

          <p className="text-xl font-semibold">
            🔥 Live Market Estimate: £{card.price != null ? card.price.toFixed(2) : 'N/A'}
          </p>

          <div className="flex items-center gap-4 mt-4">
            <Image
              src="/ebay-logo.svg"
              alt="eBay Logo"
              width={90}
              height={32}
              className="object-contain"
            />
            <a
              href={affiliateUrl}
              className="bg-[#e53238] text-white text-lg px-6 py-2 rounded font-bold hover:bg-[#c11b1f] transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on eBay
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
