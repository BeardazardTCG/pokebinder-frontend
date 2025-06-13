'use client';

import useSWR from 'swr';

type ScrapeStats = {
  sold: number;
  active: number;
  tcg: number;
  total: number;
  lastUpdated: string;
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function LiveScrapeStats() {
  const { data: stats, error } = useSWR<ScrapeStats>(
    '/api/stats/scrape-count',
    fetcher,
    {
      refreshInterval: 30000,
      dedupingInterval: 15000,
      revalidateOnFocus: false,
    }
  );

  if (error) {
    return (
      <div className="mt-6 text-center text-sm text-red-300">
        ⚠️ Tracker unavailable
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="mt-6 text-center text-sm text-white/70">
        Loading tracker data...
      </div>
    );
  }

  const { sold, active, tcg, total, lastUpdated } = stats;
  const updated = new Date(lastUpdated).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-blue-800/40 px-6 py-6 rounded-2xl shadow-inner text-white text-base md:text-lg leading-relaxed space-y-4">
      <div className="flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="font-medium">
          <strong className="text-white font-semibold">
            {total.toLocaleString()}
          </strong>{' '}
          listings scanned
        </span>
        <span className="text-sm text-white/60">(updated {updated})</span>
      </div>

      <div className="flex justify-center gap-4 text-sm text-white/90">
        <span>
          <strong className="text-white font-semibold">
            {sold.toLocaleString()}
          </strong>{' '}
          sold
        </span>
        <span>•</span>
        <span>
          <strong className="text-white font-semibold">
            {active.toLocaleString()}
          </strong>{' '}
          active
        </span>
        <span>•</span>
        <span>
          <strong className="text-white font-semibold">
            {tcg.toLocaleString()}
          </strong>{' '}
          TCGPlayer
        </span>
      </div>
    </div>
  );
}
