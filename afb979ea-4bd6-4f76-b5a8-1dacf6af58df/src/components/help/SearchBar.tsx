import React from 'react';
import { SearchIcon } from 'lucide-react';
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
export function SearchBar({
  value,
  onChange,
  placeholder = 'Search help articles...'
}: SearchBarProps) {
  return <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon size={20} className="text-gray-400" />
      </div>
      <input type="search" value={value} onChange={e => onChange(e.target.value)} className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-3 pl-10 pr-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-base" placeholder={placeholder} />
    </div>;
}