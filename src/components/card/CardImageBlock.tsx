'use client';

import Image from 'next/image'; // ✅ Required for Next.js <Image />

type Props = {
  imageUrl: string;
  altText: string;
};

export default function CardImageBlock({ imageUrl, altText }: Props) {
  return (
    <div>
      <Image
        src={imageUrl}
        alt={altText}
        width={360}
        height={504}
        className="mx-auto rounded-xl shadow-lg"
      />
    </div>
  );
}
