'use client';

type Props = {
  affiliateUrl: string;
};

export default function BuyNowButton({ affiliateUrl }: Props) {
  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-red-600 hover:bg-red-700 text-white text-lg text-center py-3 rounded-xl font-bold shadow-md transition"
    >
      Buy Now on eBay 🔗
    </a>
  );
}

