'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [city, setCity] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      router.push(`/?city=${encodeURIComponent(city.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
      <div className="flex gap-3">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl 
                   placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 
                   focus:border-transparent transition-all"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-zinc-700 text-white rounded-xl hover:bg-zinc-600 
                   focus:outline-none focus:ring-2 focus:ring-zinc-600 
                   transition-all duration-200 font-medium"
        >
          Search
        </button>
      </div>
    </form>
  );
}
