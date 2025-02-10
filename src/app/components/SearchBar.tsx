'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { CommandIcon } from 'lucide-react';

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
    <div className="max-w-2xl mx-auto mb-8 px-4" ref={searchRef}>
      <form 
        onSubmit={handleSubmit}
        className="relative"
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-zinc-400" />
          </div>
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setShowSuggestions(true);
            }}
            placeholder="Search for a city..."
            className="w-full pl-10 pr-16 py-3 bg-zinc-800/50 border border-zinc-700 text-white rounded-xl 
                     placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 
                     focus:border-transparent transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-2 font-mono text-xs text-zinc-400">
              <CommandIcon className="h-3 w-3" /> K
            </kbd>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (city.length > 1 || suggestions.length > 0) && (
          <div className="absolute w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl shadow-lg overflow-hidden z-50">
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
