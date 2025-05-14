import React from 'react';
interface SwitchProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}
export function Switch({
  label,
  description,
  checked,
  onChange,
  disabled = false
}: SwitchProps) {
  return <div className="flex items-start">
      <div className="flex items-center h-6">
        <button type="button" role="switch" aria-checked={checked} disabled={disabled} onClick={() => onChange(!checked)} className={`${checked ? 'bg-teal-500' : 'bg-gray-200 dark:bg-gray-700'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}>
          <span aria-hidden="true" className={`${checked ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out`} />
        </button>
      </div>
      <div className="ml-3">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {label}
        </span>
        {description && <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>}
      </div>
    </div>;
}