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
        <title>{`${setName} Pokémon Card List | Track UK Values – PokéBinder`}</title>
        <meta name="description" content={`Browse all ${setName} cards with live UK prices based on real eBay sales. Trusted daily updates from PokéBinder.`} />
        <meta property="og:title" content={`${setName} Pokémon Card List`} />
        <meta property="og:description" content={`Track live market values for cards in the ${setName} set. Accurate UK pricing for collectors.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.pokebinder.co.uk/set/${setId}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${setName} Pokémon Cards`} />
        <meta name="twitter:description" content={`Check UK eBay-based prices for every card in ${setName}.`} />
        <link rel="canonical" href={`https://www.pokebinder.co.uk/set/${setId}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <TopSocialBanner />
      <Header />

      <section className="text-center py-6 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-800 mb-2">
          {setName} – Pokémon Card List & UK Prices
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 mb-4">
          Explore every card from <strong>{setName}</strong> with up-to-date UK pricing based on real eBay sales. Trusted data for collectors, players, and sellers.
        </p>
        <p className="text-xs text-zinc-400 italic">
          {cards.length} cards found • Daily values • 100% UK focused
        </p>
      </section>

      <main className="px-4 pb-16 pt-6 bg-[#fefefe]">
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
