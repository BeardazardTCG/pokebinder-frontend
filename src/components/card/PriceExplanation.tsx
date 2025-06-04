'use client';

export default function PriceExplanation() {
  return (
    <div className="bg-white border border-gray-300 rounded-xl p-5 shadow max-w-md mx-auto">
      <details>
        <summary className="font-semibold cursor-pointer text-sm">📊 How is this price calculated?</summary>
        <p className="text-xs text-gray-600 mt-2">
          We track verified eBay sales using strict filters. Median values are cleaned of slabs,
          job lots, damaged cards, and wild outliers. What you see is what the market’s actually paying.
        </p>
      </details>
    </div>
  );
}
