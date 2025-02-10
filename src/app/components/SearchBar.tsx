'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface SearchSuggestion {
  name: string;
  country: string;
  region: string;
}

export default function SearchBar() {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(city)}`);
        if (!response.ok) throw new Error('Failed to fetch suggestions');
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [city]);

  const handleSubmit = (e: React.FormEvent, selectedCity?: string) => {
    e.preventDefault();
    const searchTerm = selectedCity || city;
    if (searchTerm.trim()) {
      router.push(`/?city=${encodeURIComponent(searchTerm.trim())}`);
      setCity('');
      setShowSuggestions(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-12 px-4">
      <form 
        onSubmit={handleSubmit}
        className="relative"
      >
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-zinc-400/90" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setShowSuggestions(true);
            }}
            placeholder="Search for a city..."
            className="w-full pl-11 pr-4 py-4 bg-zinc-800/50 border border-zinc-700/50 text-white rounded-2xl 
                     placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                     focus:border-transparent transition-all backdrop-blur-sm"
          />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (city.length > 1 || suggestions.length > 0) && (
          <div className="absolute w-full mt-2 bg-zinc-800/95 border border-zinc-700/50 rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-sm">
            {isLoading ? (
              <div className="p-4 text-center text-zinc-400">
                <div className="animate-spin inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
              </div>
            ) : suggestions.length > 0 ? (
              <ul className="max-h-64 overflow-auto">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      onClick={(e) => handleSubmit(e, suggestion.name)}
                      className="w-full px-4 py-3 flex items-start gap-3 hover:bg-zinc-700/50 transition-colors"
                    >
                      <MapPinIcon className="w-5 h-5 text-zinc-400 mt-0.5" />
                      <div className="text-left">
                        <div className="text-white">{suggestion.name}</div>
                        <div className="text-sm text-zinc-400">
                          {suggestion.region}, {suggestion.country}
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : city.length > 1 ? (
              <div className="p-4 text-center text-zinc-400">
                No cities found
              </div>
            ) : null}
          </div>
        )}
      </form>
    </div>
  );
}
