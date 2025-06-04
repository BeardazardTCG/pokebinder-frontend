'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    window.location.href = `/search?q=${encodeURIComponent(searchTerm.trim())}`;
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg">
      <input
        type="text"
        placeholder="Search cards..."
        className="flex-grow px-4 py-2 border border-zinc-300 rounded-l-lg focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition"
      >
        Search
      </button>
    </form>
  );
}
