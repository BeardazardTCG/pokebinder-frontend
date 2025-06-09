// FILE: /app/search/page.tsx

import { getSearchResults } from '@/lib/db';
import HalfCard from '@/components/card/HalfCard';
import SidebarBuyBox from '@/components/card/SidebarBuyBox';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface SearchPageProps {
  searchParams: { q: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const results = await getSearchResults(query);

  return (
    <>
      <Header />

      <main className="px-4 pb-10">
        <h1 className="text-2xl font-bold text-center mb-1">Search Results</h1>
        <p className="text-center text-sm text-zinc-500 mb-6">
          Showing results for: <strong>{query}</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr] gap-6 max-w-7xl mx-auto">
          {/* Left Sidebar */}
          <div className="hidden md:block">
            <SidebarBuyBox query={query} side="left" />
          </div>

          {/* Main Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((card) => (
              <HalfCard key={card.unique_id} {...card} />
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="hidden md:block">
            <SidebarBuyBox query={query} side="right" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
