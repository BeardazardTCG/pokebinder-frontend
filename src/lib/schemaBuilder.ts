export function buildProductSchema({
  name,
  image,
  description,
  sku,
  price,
  url,
}: {
  name: string;
  image: string;
  description: string;
  sku: string;
  price: number;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image,
    description,
    sku,
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: price.toFixed(2),
      priceValidUntil: "2025-12-31",
      availability: "https://schema.org/InStock",
      url,
    },
  };
}
