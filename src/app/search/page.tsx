import { getSearchResults } from '@/lib/db';
import HalfCard from '@/components/card/HalfCard';
import SidebarBuyBox from '@/components/card/SidebarBuyBox';
import TopSocialBanner from '@/components/card/TopSocialBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

type SearchParams = {
  q?: string;
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: {};
  searchParams: SearchParams;
}): Promise<Metadata> {
  const query = searchParams.q?.trim() || '';
  const clean = query.replace(/[^a-zA-Z0-9 ]/g, '');

  const title = clean
    ? `Search Results for "${clean}" | PokéBinder`
    : 'Search Results | PokéBinder';

  const desc = clean
    ? `See UK market data and live listings for Pokémon cards matching "${clean}".`
    : 'See live market prices and listings for your favourite Pokémon cards.';

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: `https://www.pokebinder.co.uk/search?q=${encodeURIComponent(clean)}`,
      type: 'website',
      images: [
        {
          url: 'https://www.pokebinder.co.uk/pokebinder-logo.png',
          width: 540,
          height: 540,
          alt: 'PokéBinder Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: ['https://www.pokebinder.co.uk/pokebinder-logo.png'],
    },
    alternates: {
      canonical: `https://www.pokebinder.co.uk/search?q=${encodeURIComponent(clean)}`,
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = searchParams?.q ?? '';
  const results = await getSearchResults(query);

  return (
    <>
      <TopSocialBanner />
      <Header />

      <main className="px-4 pb-16 pt-6 bg-[#fefefe]">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-zinc-800">
          Search Results
        </h1>
        <p className="text-center text-sm text-zinc-500 mb-8">
          Showing results for: <strong className="text-orange-600">{query}</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-8 max-w-7xl mx-auto">
          <div className="hidden md:block">
            <SidebarBuyBox query={query} side="left" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
            {results.map((card) => (
              <HalfCard key={card.unique_id} {...card} />
            ))}
          </div>

          <div className="hidden md:block">
            <SidebarBuyBox query={query} side="right" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
