import { getCardFromDB, getMoreFromSet } from '@/lib/db';
import TopSocialBanner from '@/components/card/TopSocialBanner'; // ✅ Leave as-is
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FullCard from '@/components/card/FullCard';
import MoreFromSetGrid from '@/components/card/MoreFromSetGrid';

export default async function CardPage({ params }: any) {
  const slug = params.slug;
  const card = await getCardFromDB(slug).catch(() => null);

  if (!card) {
    return <div className="p-8 text-red-600 text-xl">Card not found.</div>;
  }

  const relatedCards = await getMoreFromSet(card.set_code, card.unique_id);

  return (
    <>
      <TopSocialBanner /> {/* ✅ Inserted here, no file move */}
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
