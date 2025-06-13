import { getCardsBySetId } from '@/lib/db';
import HalfCard from '@/components/card/HalfCard';
import SidebarBuyBox from '@/components/card/SidebarBuyBox';
import TopSocialBanner from '@/components/card/TopSocialBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { type Metadata } from 'next';

export async function generateMetadata({ params }: { params: Record<string, string> }): Promise<Metadata> {
  const cards = await getCardsBySetId(params.set_id);
  const name = cards?.[0]?.set_name ?? 'Set View';
  return {
    title: `${name} | PokéBinder`,
    description: `Browse all Pokémon cards in the ${name} set with live prices and listings.`,
  };
}

const SetPage = async ({ params }: { params: Record<string, string> }) => {
  const cards = await getCardsBySetId(params.set_id);
  const setName = cards?.[0]?.set_name ?? 'Unknown Set';

  return (
    <>
      <TopSocialBanner />
      <Header />

      <main className="px-4 pb-16 pt-6 bg-[#fefefe]">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-zinc-800">
          {setName}
        </h1>
        <p className="text-center text-sm text-zinc-500 mb-8">
          {cards.length > 0 ? 'All cards from this set.' : 'No cards found for this set.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-8 max-w-7xl mx-auto">
          <div className="hidden md:block">
            <SidebarBuyBox query={params.set_id} side="left" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
            {cards.map((card) => (
              <HalfCard key={card.unique_id} {...card} />
            ))}
          </div>

          <div className="hidden md:block">
            <SidebarBuyBox query={params.set_id} side="right" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SetPage;
