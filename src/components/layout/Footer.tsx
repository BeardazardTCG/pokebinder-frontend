'use client';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 text-[11px] text-center text-zinc-500 py-6 px-4 leading-relaxed">
      <p className="mb-1">
        🔧 Hand-coded in the UK using <span className="font-medium text-zinc-600">PostgreSQL</span>, <span className="font-medium text-zinc-600">Railway</span>, <span className="font-medium text-zinc-600">Next.js</span>, and live market data from <span className="font-medium text-zinc-600">eBay</span> + <span className="font-medium text-zinc-600">TCGPlayer</span>.
      </p>
      <p className="mb-1 italic text-zinc-600">
        💡 Built by collectors. Built for collectors. No suits. No shortcuts.
      </p>
      <p className="font-semibold text-zinc-700 mt-2">
        CardCatch × PokéBinder — Honest prices. Global reach.
      </p>
    </footer>
  );
}
