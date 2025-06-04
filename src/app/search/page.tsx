// src/app/search/page.tsx

import BaseLayout from '@/components/layout/BaseLayout';
import HalfCard from '@/components/card/halfcard';
import { getSearchResults } from '@/lib/search';

export default async function SearchPage({ searchParams }: any) {
  const query = searchParams?.q || '';
  const results = await getSearchResults(query);

  return (
    <BaseLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        {query && (
          <p className="text-sm text-zinc-500 mb-6">
            Showing results for: <span className="font-medium">{query}</span>
          </p>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((card: any) => (
              <HalfCard key={card.unique_id} {...card} />
            ))}
          </div>
        ) : (
          <p className="text-zinc-400 italic">No results found.</p>
        )}
      </div>
    </BaseLayout>
  );
}
