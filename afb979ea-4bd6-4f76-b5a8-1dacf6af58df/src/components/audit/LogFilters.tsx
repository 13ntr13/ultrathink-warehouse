import React from 'react';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { DateRangePicker } from '../reports/DateRangePicker';
import { SearchIcon, FilterIcon, DownloadIcon, UserIcon } from 'lucide-react';
interface LogFiltersProps {
  onFilterChange: (filters: any) => void;
  onSearch: (query: string) => void;
  onExport: () => void;
  filters: {
    actionType: string;
    user: string;
    status: string;
  };
  searchQuery: string;
}
export function LogFilters({
  onFilterChange,
  onSearch,
  onExport,
  filters,
  searchQuery
}: LogFiltersProps) {
  const actionTypes = [{
    value: 'all',
    label: 'All Actions'
  }, {
    value: 'create',
    label: 'Create'
  }, {
    value: 'update',
    label: 'Update'
  }, {
    value: 'delete',
    label: 'Delete'
  }, {
    value: 'login',
    label: 'Login'
  }, {
    value: 'permission',
    label: 'Permission'
  }];
  const statuses = [{
    value: 'all',
    label: 'All Status'
  }, {
    value: 'success',
    label: 'Success'
  }, {
    value: 'error',
    label: 'Error'
  }, {
    value: 'warning',
    label: 'Warning'
  }];
  return <div className="space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0">
        <div className="flex-1 min-w-0">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon size={16} className="text-gray-400" />
            </div>
            <input type="search" value={searchQuery} onChange={e => onSearch(e.target.value)} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" placeholder="Search logs..." />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <Select label="" value={filters.actionType} onChange={value => onFilterChange({
          ...filters,
          actionType: value
        })} options={actionTypes} />
          <Select label="" value={filters.status} onChange={value => onFilterChange({
          ...filters,
          status: value
        })} options={statuses} />
          <Button variant="outline" size="sm" icon={<FilterIcon size={16} />}>
            More Filters
          </Button>
          <Button variant="outline" size="sm" icon={<DownloadIcon size={16} />} onClick={onExport}>
            Export Logs
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <DateRangePicker startDate={new Date()} endDate={new Date()} onChange={() => {}} />
      </div>
    </div>;
}