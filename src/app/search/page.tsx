// FILE: /app/search/page.tsx

import { getSearchResults } from '@/lib/db';
import HalfCard from '@/components/card/HalfCard';
import SidebarBuyBox from '@/components/card/SidebarBuyBox';
import TopSocialBanner from '@/components/card/TopSocialBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PaginationControls from '@/components/ui/PaginationControls';

interface Props {
  searchParams: { q?: string; page?: string };
}

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q?.trim() || '';
  const page = parseInt(searchParams.page || '1');
  const pageSize = 20;

  const allResults = query ? await getSearchResults(query) : [];
  const totalPages = Math.ceil(allResults.length / pageSize);
  const paginated = allResults.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <TopSocialBanner />
      <Header />

      <main className="px-4 pb-16 pt-6 bg-[#fefefe]">
        <h1 className="text-3xl font-extrabold text-center mb-2 text-zinc-800">
          {query ? `Results for “${query}”` : 'Search Results'}
        </h1>
        <p className="text-center text-sm text-zinc-500 mb-8">
          {query ? `${allResults.length} result${allResults.length !== 1 ? 's' : ''} found.` : 'Enter a search term above.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-8 max-w-7xl mx-auto">
          <div className="hidden md:block">
            <SidebarBuyBox query={query} side="left" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
            {paginated.map((card) => (
              <HalfCard key={card.unique_id} {...card} />
            ))}
          </div>

          <div className="hidden md:block">
            <SidebarBuyBox query={query} side="right" />
          </div>
        </div>

        {totalPages > 1 && (
          <div className="mt-12 text-center">
            <PaginationControls currentPage={page} totalPages={totalPages} basePath="/search" query={query} />
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
