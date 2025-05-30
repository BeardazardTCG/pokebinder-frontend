'use client';

import { useEffect, useState } from 'react';

type ScrapeStats = {
  sold: number;
  active: number;
  tcg: number;
  total: number;
  lastUpdated: string;
};

export default function LiveScrapeStats() {
  const [stats, setStats] = useState<ScrapeStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats/scrape-count');
        const contentType = res.headers.get('content-type');

        if (!res.ok || !contentType?.includes('application/json')) {
          throw new Error('Invalid API response');
        }

        const data = await res.json();

        if (
          typeof data.total !== 'number' ||
          typeof data.sold !== 'number' ||
          typeof data.active !== 'number' ||
          typeof data.tcg !== 'number'
        ) {
          throw new Error('Invalid data structure');
        }

        setStats(data);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch scrape stats:', err.message || err);
        setError(err.message || 'Failed to load data');
        setStats(null);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="mt-8 text-center text-sm text-red-500">
        ⚠️ {error}
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
    <div className="mt-8 text-center text-sm text-gray-600">
      <span className="inline-block w-2 h-2 mr-2 rounded-full bg-green-500 animate-pulse" />
      <strong>{total.toLocaleString()}</strong> total scrapes completed ·
      <span className="ml-1 text-gray-500">
        ({sold.toLocaleString()} eBay sold • {active.toLocaleString()} active • {tcg.toLocaleString()} TCG)
      </span>
      <div className="text-xs text-gray-400 mt-1">(as of {updated})</div>
    </div>
  );
}

