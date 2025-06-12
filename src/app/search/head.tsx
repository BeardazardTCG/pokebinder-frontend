import { headers } from 'next/headers';

export default function Head() {
  const headersList = headers();
  const url = headersList.get('x-url') || '';
  const query = new URL(url, 'https://www.pokebinder.co.uk').searchParams.get('q') || '';

  const safeQuery = decodeURIComponent(query).replace(/[^a-zA-Z0-9 ]/g, '').trim();
  const capitalized = safeQuery.charAt(0).toUpperCase() + safeQuery.slice(1);

  const title = safeQuery
    ? `Search Results for "${capitalized}" | PokéBinder`
    : 'Search Cards | PokéBinder';

  const description = safeQuery
    ? `Live UK Pokémon card prices for "${capitalized}". View recent values, active listings, and more from PokéBinder.`
    : 'Search live Pokémon card prices from the UK market. Filter by name, set, or number.';

  const fullUrl = `https://www.pokebinder.co.uk/search?q=${encodeURIComponent(safeQuery)}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.pokebinder.co.uk/banner.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.pokebinder.co.uk/banner.png" />
      <link rel="canonical" href={fullUrl} />
    </>
  );
}
