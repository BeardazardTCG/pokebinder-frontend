"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-8 px-6 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">

        {/* Left: Build Cred */}
        <div className="space-y-2 max-w-md">
          <p className="text-yellow-300 font-semibold">Built by Collectors</p>
          <p className="text-gray-300">
            Powered by PostgreSQL, Railway, and live market data from eBay + TCG.
            No corp funding. No inflated averages.
          </p>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} PokéBinder. Not affiliated with Pokémon or Nintendo.
          </p>
        </div>

        {/* Center: Links */}
        <div className="flex flex-col space-y-1 md:items-center">
          <a href="/updates" className="hover:underline">Updates</a>
          <a href="/blog" className="hover:underline">Blog</a>
          <a href="/terms" className="hover:underline">Terms</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>

        {/* Right: Donation */}
        <div className="flex flex-col items-start md:items-end space-y-2">
          <p className="text-yellow-300 font-semibold">Support PokéBinder</p>
          <a
            href="https://buymeacoffee.com/pokebinder"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-black font-bold px-4 py-1.5 rounded-full hover:bg-yellow-500 transition"
          >
            ☕ Buy Us a Coffee
          </a>
        </div>

      </div>
    </footer>
  );
}
