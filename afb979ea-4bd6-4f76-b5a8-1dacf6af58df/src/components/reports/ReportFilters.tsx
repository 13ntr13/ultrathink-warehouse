import React from 'react';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { FilterIcon, DownloadIcon } from 'lucide-react';
interface ReportFiltersProps {
  onFilterChange: (filters: any) => void;
  onExport: (format: string) => void;
  onRefresh: () => void;
}
export function ReportFilters({
  onFilterChange,
  onExport,
  onRefresh
}: ReportFiltersProps) {
  return <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
      <div className="flex items-center space-x-4">
        <Select label="" value="all" onChange={() => {}} options={[{
        value: 'all',
        label: 'All Categories'
      }, {
        value: 'electronics',
        label: 'Electronics'
      }, {
        value: 'clothing',
        label: 'Clothing'
      }, {
        value: 'food',
        label: 'Food & Beverage'
      }]} />
        <Select label="" value="all" onChange={() => {}} options={[{
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
      <div className="flex items-center space-x-2 ml-auto">
        <Button variant="outline" size="sm" icon={<div size={16} />} onClick={onRefresh}>
          Refresh
        </Button>
        <Select label="" value="csv" onChange={format => onExport(format)} options={[{
        value: 'csv',
        label: 'Export CSV'
      }, {
        value: 'pdf',
        label: 'Export PDF'
      }, {
        value: 'excel',
        label: 'Export Excel'
      }]} />
      </div>
    </div>;
}