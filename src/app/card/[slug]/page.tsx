import { Metadata } from 'next';
import { getCardFromDB, getMoreFromSet } from '@/lib/db';
import TopSocialBanner from '@/components/card/TopSocialBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FullCard from '@/components/card/FullCard';
import MoreFromSetGrid from '@/components/card/MoreFromSetGrid';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const card = await getCardFromDB(params.slug).catch(() => null);

  if (!card) return {};

  return {
    title: `${card.card_name} | ${card.set_name} | PokéBinder`,
    description: `Track real-time UK market prices for ${card.card_name} from ${card.set_name}.`,
    openGraph: {
      title: `${card.card_name} | ${card.set_name}`,
      description: `Live market prices for ${card.card_name} (${card.set_code} #${card.card_number})`,
      images: [card.card_image_url],
    },
  };
}

export default async function CardPage({ params }: any) {
  const slug = params.slug;
  const card = await getCardFromDB(slug).catch(() => null);
  if (!card) return <div className="p-8 text-red-600 text-xl">Card not found.</div>;

  const relatedCards = await getMoreFromSet(card.set_code, card.unique_id);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: card.card_name,
    image: card.card_image_url,
    description: `UK market value for ${card.card_name} from ${card.set_name}.`,
    sku: card.unique_id,
    brand: {
      "@type": "Brand",
      name: "Pokémon TCG"
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: card.clean_avg_value,
      itemCondition: "https://schema.org/UsedCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "PokéBinder"
      }
    }
  };

  return (
    <>
      {/* 🧠 Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <TopSocialBanner />
      <Header />
      <main className="px-4 py-6 bg-white min-h-screen max-w-7xl mx-auto">
        <FullCard card={card} />
        {relatedCards.length > 0 && (
          <div className="mt-12">
            <MoreFromSetGrid setName={card.set_name} cards={relatedCards} />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
