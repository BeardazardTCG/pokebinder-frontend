'use client';

type Props = {
  price: number | null;
};

export default function PriceEstimateBox({ price }: Props) {
  return (
    <div className="bg-green-50 border border-green-300 p-6 rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">🔥 Live Market Estimate</h2>
      <p className="text-3xl font-extrabold text-green-700">
        £{price != null ? price.toFixed(2) : 'N/A'}
      </p>
      <p className="text-xs text-gray-600 mt-2 italic">
        Based on recent verified sales. No slabs, bundles, or outliers.
      </p>
    </div>
  );
}
