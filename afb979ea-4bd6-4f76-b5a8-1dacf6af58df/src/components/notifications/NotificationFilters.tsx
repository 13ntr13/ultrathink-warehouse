import React from 'react';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { SearchIcon, FilterIcon } from 'lucide-react';
interface NotificationFiltersProps {
  onFilterChange: (filter: string) => void;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: string) => void;
  filter: string;
  search: string;
  status: string;
}
export function NotificationFilters({
  onFilterChange,
  onSearchChange,
  onStatusChange,
  filter,
  search,
  status
}: NotificationFiltersProps) {
  return <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
      <div className="flex-1 min-w-0">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon size={16} className="text-gray-400" />
          </div>
          <input type="search" value={search} onChange={e => onSearchChange(e.target.value)} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" placeholder="Search notifications..." />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Select label="" value={filter} onChange={onFilterChange} options={[{
        value: 'all',
        label: 'All Types'
      }, {
        value: 'system',
        label: 'System'
      }, {
        value: 'order',
        label: 'Orders'
      }, {
        value: 'user',
        label: 'Users'
      }, {
        value: 'error',
        label: 'Errors'
      }, {
        value: 'success',
        label: 'Success'
      }]} />
        <Select label="" value={status} onChange={onStatusChange} options={[{
        value: 'all',
        label: 'All Status'
      }, {
        value: 'unread',
        label: 'Unread'
      }, {
        value: 'read',
        label: 'Read'
      }]} />
        <Button variant="outline" size="sm" icon={<FilterIcon size={16} />}>
          More Filters
        </Button>
      </div>
    </div>;
}