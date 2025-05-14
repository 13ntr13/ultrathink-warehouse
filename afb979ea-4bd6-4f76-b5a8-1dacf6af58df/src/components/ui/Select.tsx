import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
interface SelectOption {
  value: string;
  label: string;
}
interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
}
export function Select({
  label,
  value,
  onChange,
  options,
  disabled = false
}: SelectProps) {
  return <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
          {options.map(option => <option key={option.value} value={option.value}>
              {option.label}
            </option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
          <ChevronDownIcon size={16} />
        </div>
      </div>
    </div>;
}