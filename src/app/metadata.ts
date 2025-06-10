import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'PokéBinder | Honest Pokémon Card Prices',
    template: '%s | PokéBinder'
  },
  description: 'Track live Pokémon card values using real eBay + TCG sales. Built by collectors. Powered by obsession.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    title: 'PokéBinder',
    description: 'Live market estimates, card search, set browsers, and upcoming Pro tools for collectors.',
    url: 'https://www.pokebinder.co.uk',
    siteName: 'PokéBinder',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PokéBinder — Honest Pokémon Prices',
      }
    ],
    locale: 'en_GB',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PokéBinder',
    description: 'Live Pokémon card prices powered by real eBay + TCG data.',
    images: ['/og-image.png'],
    creator: '@pokebinder'
  }
};
