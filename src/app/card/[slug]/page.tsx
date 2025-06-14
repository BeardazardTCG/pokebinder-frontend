import { getCardFromDB, getMoreFromSet } from '@/lib/db';
import TopSocialBanner from '@/components/card/TopSocialBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FullCard from '@/components/card/FullCard';
import MoreFromSetGrid from '@/components/card/MoreFromSetGrid';
import Head from 'next/head'; // ✅ NEW

export default async function CardPage({ params }: any) {
  const slug = params.slug;
  const card = await getCardFromDB(slug).catch(() => null);

  if (!card) {
    return <div className="p-8 text-red-600 text-xl">Card not found.</div>;
  }

  const relatedCards = await getMoreFromSet(card.set_code, card.unique_id);

  return (
    <>
      <Head>
        <title>{card.card_name} | PokéBinder</title>
        <meta name="description" content={`Live price and stats for ${card.card_name} (${card.card_number}) from ${card.set_name}.`} />
        <script type="application/ld+json" suppressHydrationWarning>
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: card.card_name,
            image: card.card_image_url,
            description: `Pokémon TCG card from ${card.set_name}, card number ${card.card_number}.`,
            sku: card.unique_id,
            brand: {
              "@type": "Brand",
              name: "Pokémon"
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "GBP",
              price: Number(card.clean_avg_value || 0).toFixed(2),
              availability: "https://schema.org/InStock"
            }
          })}
        </script>
      </Head>

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
