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
      refreshInterval: 30000,       // ⏱ every 30 seconds
      dedupingInterval: 15000,      // 🧠 avoid repeated fetches
      revalidateOnFocus: false,
    }
  );

  if (error) {
    return (
      <div className="mt-8 text-center text-sm text-red-500">
        ⚠️ Failed to load scrape stats.
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="mt-8 text-center text-sm text-gray-400">
        Loading scrape stats...
      </div>
    );
  }

  const { sold, active, tcg, total, lastUpdated } = stats;
  const updated = new Date(lastUpdated).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="mt-8 text-center text-sm text-gray-700">
      <div className="flex justify-center items-center gap-2 mb-1">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span>
          <strong className="text-md text-zinc-800">{total.toLocaleString()}</strong> total checks
        </span>
        <span className="text-xs text-gray-400">(updated {updated})</span>
      </div>

      <div className="flex justify-center gap-4 text-xs text-gray-500">
        <span><strong className="text-zinc-700">{sold.toLocaleString()}</strong> sold</span>
        <span>•</span>
        <span><strong className="text-zinc-700">{active.toLocaleString()}</strong> active</span>
        <span>•</span>
        <span><strong className="text-zinc-700">{tcg.toLocaleString()}</strong> TCG</span>
      </div>
    </div>
  );
}
