'use client';

import Image from 'next/image'; // ✅ This line fixes the crash

type Props = {
  name: string;
  number: string;
  setName: string;
  setLogoUrl?: string;
};

export default function CardHeader({ name, number, setName, setLogoUrl }: Props) {
  return (
    <div className="text-center space-y-2">
      <h1 className="text-3xl font-bold">
        {name} <span className="text-gray-500">#{number}</span>
      </h1>
      <p className="text-sm text-gray-500 italic">{setName}</p>
      {setLogoUrl && (
        <div className="flex justify-center">
          <Image src={setLogoUrl} alt="Set Logo" width={120} height={36} />
        </div>
      )}
    </div>
  );
}

