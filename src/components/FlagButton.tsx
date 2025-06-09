// src/components/FlagButton.tsx
'use client';

export default function FlagButton() {
  return (
    <button
      className="mt-4 text-xs text-gray-500 hover:text-red-600 underline underline-offset-2"
      onClick={() => alert("Thanks for flagging! We’ll review this shortly.")}
    >
      ⚠️ Flag an issue with this card
    </button>
  );
}
