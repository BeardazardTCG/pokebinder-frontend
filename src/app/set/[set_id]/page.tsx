import Head from 'next/head';
import { getCardsBySetId } from '@/lib/db';
import HalfCard from '@/components/card/HalfCard';
import SidebarBuyBox from '@/components/card/SidebarBuyBox';
import TopSocialBanner from '@/components/card/TopSocialBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default async function Page({ params }: any) {
  const setId = params.set_id;
  const cards = await getCardsBySetId(setId);
  const setName = cards?.[0]?.set_name ?? 'Unknown Set';

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${setName} Pokémon Card List`,
    numberOfItems: cards.length,
    itemListElement: cards.slice(0, 30).map((card, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.pokebinder.co.uk/card/${card.unique_id}`,
      name: `${card.card_name} (${card.card_number})`
    }))
  };

  return (
    <>
      <Head>
        <title>{`${setName} Pokémon Cards | Live UK Prices – PokéBinder`}</title>
        <meta name="description" content={`Track market prices for all cards in the ${setName} Pokémon TCG set.`} />
        <meta property="og:title" content={`${setName} Pokémon Cards | Live UK Prices`} />
        <meta property="og:description" content={`See all cards from ${setName} with trusted market pricing.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.pokebinder.co.uk/set/${setId}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${setName} Pokémon Cards`} />
        <meta name="twitter:description" content={`Live UK prices and listings for ${setName}.`} />
        <link rel="canonical" href={`https://www.pokebinder.co.uk/set/${setId}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

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
            <SidebarBuyBox query={setId} side="left" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
            {cards.map((card) => (
              <HalfCard key={card.unique_id} {...card} />
            ))}
          </div>

          <div className="hidden md:block">
            <SidebarBuyBox query={setId} side="right" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
