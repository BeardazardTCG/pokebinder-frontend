'use client';
import { useEffect, useState } from 'react';
import SignupPrompt from './SignupPrompt';

export default function TimedSignupPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('signup_popup_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setVisible(true);
        sessionStorage.setItem('signup_popup_seen', 'true');
      }, 60000); // 60 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-600 text-lg font-bold"
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-2 text-indigo-700">🎁 Wait! Don’t miss this!</h2>
        <p className="text-sm text-zinc-700 mb-4">
          Grab a free Pokémon TCG code — just sign up below. No strings, just value.
        </p>
        <SignupPrompt />
      </div>
    </div>
  );
}
