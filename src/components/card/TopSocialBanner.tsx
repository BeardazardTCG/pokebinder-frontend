'use client';

import Script from 'next/script';
import { FaTiktok, FaInstagram, FaYoutube, FaDiscord, FaCoffee } from 'react-icons/fa';
import Link from 'next/link';

export default function TopSocialBanner() {
  return (
    <>
      {/* ✅ Google Analytics */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-42K0R40Z54"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-42K0R40Z54');
          `,
        }}
      />

      {/* 🔗 Social banner */}
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
          <Link href="/updates" className="flex items-center gap-1 hover:text-blue-600">
            <span className="text-base">📝</span>
            <span className="hidden md:inline">Updates</span>
          </Link>
          <Link href="/blog" className="flex items-center gap-1 hover:text-green-700">
            <span className="text-base">📚</span>
            <span className="hidden md:inline">Blog</span>
          </Link>
        </div>
      </div>
    </>
  );
}
