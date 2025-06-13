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
    <div className="bg-blue-800/40 px-6 py-6 rounded-2xl border border-white/15 shadow-inner text-white text-base leading-relaxed space-y-4">
      {/* LIVE badge */}
      <div className="flex justify-start items-center gap-2 mb-1">
        <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-white/60 tracking-wide uppercase font-semibold">Live Sync Active</span>
      </div>

      {/* Total listings */}
      <div className="text-center text-white">
        <span className="text-lg md:text-2xl font-bold font-mono">
          {total.toLocaleString()}
        </span>
        <div className="text-sm text-white/70 mt-1">listings scanned (updated {updated})</div>
      </div>

      {/* Source breakdown */}
      <div className="flex justify-center gap-6 text-sm text-white/80 font-mono">
        <span>
          <strong className="text-white">{sold.toLocaleString()}</strong> sold
        </span>
        <span>
          <strong className="text-white">{active.toLocaleString()}</strong> active
        </span>
        <span>
          <strong className="text-white">{tcg.toLocaleString()}</strong> TCGPlayer
        </span>
      </div>
    </div>
  );
}
