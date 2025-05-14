import React from 'react';
import { Button } from '../ui/Button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
}
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  selectable?: boolean;
  selectedIds?: string[];
  onSelectAll?: (checked: boolean) => void;
  onSelectItem?: (id: string) => void;
  keyField?: string;
  actions?: React.ReactNode;
}
export function DataTable<T extends {
  id: string;
}>({
  data,
  columns,
  selectable = false,
  selectedIds = [],
  onSelectAll,
  onSelectItem,
  keyField = 'id',
  actions
}: DataTableProps<T>) {
  return <div className="space-y-4">
      {actions && <div className="mb-4">{actions}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              {selectable && <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500" checked={selectedIds.length === data.length && data.length > 0} onChange={e => onSelectAll?.(e.target.checked)} />
                </th>}
              {columns.map(column => <th key={column.key} className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" style={{
              width: column.width
            }}>
                  {column.header}
                </th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map(item => <tr key={item[keyField as keyof T] as string} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                {selectable && <td className="px-4 py-3">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500" checked={selectedIds.includes(item[keyField as keyof T] as string)} onChange={() => onSelectItem?.(item[keyField as keyof T] as string)} />
                  </td>}
                {columns.map(column => <td key={column.key} className="px-4 py-3 whitespace-nowrap">
                    {column.render ? column.render(item) : item[column.key as keyof T] as React.ReactNode}
                  </td>)}
              </tr>)}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">10</span> of{' '}
            <span className="font-medium">20</span> results
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" icon={<ChevronLeftIcon size={16} />}>
            Previous
          </Button>
          <Button variant="outline" size="sm" icon={<ChevronRightIcon size={16} />}>
            Next
          </Button>
        </div>
      </div>
    </div>;
}