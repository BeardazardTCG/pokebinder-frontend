'use client';

import { useState } from 'react';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'exists'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      if (res.ok) {
        setStatus(data.message.includes('already') ? 'exists' : 'success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-4">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        placeholder="Enter your email"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        type="submit"
        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded"
      >
        Sign Up
      </button>

      {status === 'success' && <p className="text-green-600 mt-2">🎉 Signed up!</p>}
      {status === 'exists' && <p className="text-yellow-600 mt-2">You're already on the list.</p>}
      {status === 'error' && <p className="text-red-600 mt-2">Oops, something went wrong.</p>}
    </form>
  );
}
