// src/components/layout/TopSocialBanner.tsx
import { FaTiktok, FaInstagram, FaYoutube, FaDiscord, FaCoffee } from 'react-icons/fa';
import Link from 'next/link';

export default function TopSocialBanner() {
  return (
    <div className="w-full bg-zinc-100 text-zinc-700 text-xs md:text-sm h-10 flex items-center justify-center px-2 md:px-4 border-b border-zinc-200">
      <div className="flex gap-4 items-center justify-center flex-wrap">
        <Link href="https://www.tiktok.com/@pokebinderofficial" target="_blank" className="flex items-center gap-1 hover:text-pink-600">
          <FaTiktok className="text-base" />
          <span className="hidden md:inline">@pokebinderofficial</span>
        </Link>
        <Link href="https://www.instagram.com/pokebinderofficial" target="_blank" className="flex items-center gap-1 hover:text-pink-500">
          <FaInstagram className="text-base" />
          <span className="hidden md:inline">@pokebinderofficial</span>
        </Link>
        <Link href="https://www.youtube.com/@pokebinderofficial" target="_blank" className="flex items-center gap-1 hover:text-red-600">
          <FaYoutube className="text-base" />
          <span className="hidden md:inline">Subscribe</span>
        </Link>
        <Link href="https://discord.gg/RFnCQREb" target="_blank" className="flex items-center gap-1 hover:text-indigo-600">
          <FaDiscord className="text-base" />
          <span className="hidden md:inline">Join Us</span>
        </Link>
        <Link href="https://ko-fi.com/pokebinder" target="_blank" className="flex items-center gap-1 hover:text-amber-700">
          <FaCoffee className="text-base" />
          <span className="hidden md:inline">Support Us</span>
        </Link>
      </div>
    </div>
  );
}
