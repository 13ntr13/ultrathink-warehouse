import React from 'react';
import { Card } from '../ui/Card';
import { DataTable } from '../shared/DataTable';
import { Badge } from '../ui/Badge';
import { AlertCircleIcon } from 'lucide-react';
interface ImportPreviewProps {
  data: any[];
  errors: Record<string, string[]>;
  columns: {
    key: string;
    header: string;
    width?: string;
  }[];
}
export function ImportPreview({
  data,
  errors,
  columns
}: ImportPreviewProps) {
  const tableColumns = columns.map(col => ({
    ...col,
    render: (row: any) => {
      const hasError = errors[row.id]?.includes(col.key);
      return <div className="flex items-center space-x-2">
          <span className={hasError ? 'text-red-500 dark:text-red-400' : 'text-inherit'}>
            {row[col.key]}
          </span>
          {hasError && <AlertCircleIcon size={16} className="text-red-500" />}
        </div>;
    }
  }));
  const errorCount = Object.keys(errors).length;
  return <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Data Preview</h3>
          {errorCount > 0 && <Badge variant="danger">
              {errorCount} {errorCount === 1 ? 'Error' : 'Errors'} Found
            </Badge>}
        </div>
        <DataTable data={data} columns={tableColumns} keyField="id" />
      </div>
    </Card>;
}