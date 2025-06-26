import { Metadata } from 'next';
import { getCardByParts, getMoreFromSet } from '@/lib/db';
import TopSocialBanner from '@/components/card/TopSocialBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FullCard from '@/components/card/FullCard';
import MoreFromSetGrid from '@/components/card/MoreFromSetGrid';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const card = await getCardByParts(params.character, params.set, params['card-number']).catch(() => null);
  if (!card) {
    return {
      title: 'Card Not Found | PokéBinder',
      description: 'No card data available.',
      openGraph: { images: [] },
    };
  }

  return {
    title: `${card.card_name} | ${card.set_name} | PokéBinder`,
    description: `Track the real-time UK market value for ${card.card_name} from the ${card.set_name} set. Honest pricing from sold listings.`,
    openGraph: {
      title: `${card.card_name} | ${card.set_name}`,
      description: `UK eBay market snapshot for ${card.card_name} (${card.set_code} #${card.card_number}) on PokéBinder.`,
      images: [{ url: card.card_image_url, width: 800, height: 1120, alt: `${card.card_name} from ${card.set_name}` }],
      type: "product",
      url: `https://pokebinder.co.uk/cards/${params.character}/${params.set}/${params['card-number']}`
    },
    twitter: {
      card: 'summary_large_image',
      title: `${card.card_name} | ${card.set_name} | PokéBinder`,
      description: `Live price data for ${card.card_name}. No inflated values – just clean UK collector insight.`,
      images: [card.card_image_url],
    },
    metadataBase: new URL('https://pokebinder.co.uk')
  };
}

export default async function CardPage({ params }: any) {
  console.log("🪵 ROUTE PARAMS:", params);

  const { character, set, ['card-number']: cardNumber } = params;

  const card = await getCardByParts(character, set, cardNumber).catch(() => null);
  if (!card) return <div className="p-8 text-red-600 text-xl">Card not found.</div>;

  const relatedCards = await getMoreFromSet(card.set_code, card.unique_id);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${card.card_name} - ${card.set_name} (${card.card_number})`,
    image: card.card_image_url,
    description: `Track UK market value for ${card.card_name} from ${card.set_name}. Updated daily from eBay sold listings.`,
    sku: card.unique_id,
    brand: { "@type": "Brand", name: "Pokémon" },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: card.price_range_seen_min || card.clean_avg_value,
      highPrice: card.price_range_seen_max || card.clean_avg_value,
      priceCurrency: "GBP",
      offerCount: 1,
      availability: "https://schema.org/InStock",
      priceValidUntil: "2025-12-31",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "GB",
        "returnPolicyCategory": "https://schema.org/NoReturns"
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "GB" },
        "shippingRate": { "@type": "MonetaryAmount", "value": "0.00", "currency": "GBP" },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "d" },
          "transitTime": { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 5, "unitCode": "d" }
        }
      }
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "0",
      reviewCount: "0"
    },
    review: []
  };

  const imageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: card.card_image_url,
    name: `${card.card_name} (${card.set_name})`,
    license: "https://www.pokebinder.co.uk",
    creditText: "PokéBinder",
    acquireLicensePage: "https://www.pokebinder.co.uk",
    copyrightNotice: "Image copyright PokéBinder",
    creator: "PokéBinder"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much is ${card.card_name} worth?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "PokéBinder tracks live UK eBay sales to estimate fair market prices. Check the top of this page for the current value."
        }
      },
      {
        "@type": "Question",
        name: "Where can I buy or sell this card?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the Buy Now button on this page to view trusted eBay UK listings, or track price trends to sell at the right time."
        }
      },
      {
        "@type": "Question",
        name: "Can I sell my card for this price?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can use this price as a benchmark to list your card fairly. You might sell higher if your card is mint or popular."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <TopSocialBanner />
      <Header />
      <main className="px-4 py-6 bg-white min-h-screen max-w-7xl mx-auto">
        <FullCard card={card} />
        {relatedCards.length > 0 && (
          <div className="mt-12">
            <MoreFromSetGrid setName={card.set_name} cards={relatedCards} />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
