import React from 'react';
import { Badge } from '../ui/Badge';
import { CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
interface StatusBannerProps {
  status: 'operational' | 'maintenance' | 'incident';
  message: string;
  lastUpdated: string;
}
export function StatusBanner({
  status,
  message,
  lastUpdated
}: StatusBannerProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'operational':
        return {
          icon: <CheckCircleIcon size={16} />,
          badge: 'success',
          text: 'All Systems Operational'
        };
      case 'maintenance':
        return {
          icon: <AlertCircleIcon size={16} />,
          badge: 'warning',
          text: 'Scheduled Maintenance'
        };
      case 'incident':
        return {
          icon: <AlertCircleIcon size={16} />,
          badge: 'danger',
          text: 'System Incident'
        };
    }
  };
  const config = getStatusConfig();
  return <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Badge variant={config.badge as any} className="flex items-center gap-1">
            {config.icon}
            <span>{config.text}</span>
          </Badge>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {message}
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Updated {lastUpdated}
        </span>
      </div>
    </div>;
}