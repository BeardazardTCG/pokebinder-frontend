import { Metadata } from 'next';
import { getCardFromDB } from '@/lib/db';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = params;
  const card = await getCardFromDB(slug).catch(() => null);

  if (!card) {
    return {
      title: 'Card Not Found | PokéBinder',
      description: 'No card data available.',
      openGraph: { images: [] },
    };
  }

  return {
    title: `${card.card_name} #${card.card_number} | PokéBinder`,
    description: `${card.set_name} – Live Market Tracker`,
    openGraph: {
      images: [card.card_image_url || ''],
    },
  };
}
