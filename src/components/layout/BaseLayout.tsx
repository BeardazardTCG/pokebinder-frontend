// /components/layout/BaseLayout.tsx

import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fefefe] text-zinc-800 font-sans">
      {/* Top Navbar */}
      <header className="w-full px-6 py-4 shadow-sm bg-white border-b border-zinc-200 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/assets/logos/pokebinder-logo.png" alt="PokéBinder" width={42} height={42} />
            <span className="text-xl font-bold tracking-tight">PokéBinder</span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/search">Search</Link>
            <Link href="/sets">Sets</Link>
            <Link href="/binder">My Binder</Link>
            <Link href="/pro">Pro</Link>
          </div>
        </div>

        {/* Global Search */}
        <div className="mt-4 max-w-xl mx-auto">
          <SearchBar />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-zinc-200 px-6 py-6 text-xs text-center text-zinc-500">
        Built By Collectors For Collectors. © {new Date().getFullYear()} PokéBinder. Not affiliated with Pokémon/Nintendo.
      </footer>
    </div>
  );
}
