import { getSearchResults } from '@/lib/db';
import HalfCard from '@/components/card/HalfCard';
import SidebarBuyBox from '@/components/card/SidebarBuyBox';
import TopSocialBanner from '@/components/card/TopSocialBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// ✅ Dynamic metadata generator for search-based SEO
export async function generateMetadata({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q ?? 'Pokémon cards';
  return {
    title: `Search results for "${query}" | PokéBinder`,
    description: `Live UK prices and listings for "${query}" Pokémon cards. See what your cards are worth now.`,
  };
}

export default async function Page({ searchParams }: any) {
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
