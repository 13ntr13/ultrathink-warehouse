import React from 'react';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { SearchIcon, FilterIcon } from 'lucide-react';
interface UserFiltersProps {
  onRoleFilter: (role: string) => void;
  onStatusFilter: (status: string) => void;
  onSearch: (query: string) => void;
  roleFilter: string;
  statusFilter: string;
  searchQuery: string;
}
export function UserFilters({
  onRoleFilter,
  onStatusFilter,
  onSearch,
  roleFilter,
  statusFilter,
  searchQuery
}: UserFiltersProps) {
  return <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
      <div className="flex-1 min-w-0">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon size={16} className="text-gray-400" />
          </div>
          <input type="search" value={searchQuery} onChange={e => onSearch(e.target.value)} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" placeholder="Search users..." />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Select label="" value={roleFilter} onChange={onRoleFilter} options={[{
        value: 'all',
        label: 'All Roles'
      }, {
        value: 'admin',
        label: 'Admin'
      }, {
        value: 'manager',
        label: 'Manager'
      }, {
        value: 'user',
        label: 'User'
      }]} />
        <Select label="" value={statusFilter} onChange={onStatusFilter} options={[{
        value: 'all',
        label: 'All Status'
      }, {
        value: 'active',
        label: 'Active'
      }, {
        value: 'inactive',
        label: 'Inactive'
      }]} />
        <Button variant="outline" size="sm" icon={<FilterIcon size={16} />}>
          More Filters
        </Button>
      </div>
    </div>;
}