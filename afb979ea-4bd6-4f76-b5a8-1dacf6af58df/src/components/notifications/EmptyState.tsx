import React from 'react';
import { BellIcon } from 'lucide-react';
interface EmptyStateProps {
  message: string;
}
export function EmptyState({
  message
}: EmptyStateProps) {
  return <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <BellIcon size={24} className="text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        No notifications
      </h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{message}</p>
    </div>;
}