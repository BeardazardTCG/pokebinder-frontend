'use client';
import { useState } from 'react';

export default function SignupPrompt() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [code, setCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      setStatus('success');
      setCode(data.code);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto border border-blue-300 bg-blue-50 rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-bold mb-3 text-blue-700">🎁 Get a Free TCG Code</h3>
      <p className="text-sm text-blue-600 mb-4">
        Enter your email to receive PokéBinder updates — and we’ll give you a TCG code instantly.
      </p>

      {status === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-800 rounded p-4 text-sm">
          ✅ You're signed up!<br />
          <strong>Your free code:</strong> <span className="font-mono">{code || '⚠️ All codes claimed!'}</span>
        </div>
      )}

      {status !== 'success' && (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="border border-gray-300 rounded px-4 py-2 text-sm w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
            Notify Me
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="text-red-600 text-sm mt-2">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}
