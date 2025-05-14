import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Switch } from '../ui/Switch';
import { DownloadIcon } from 'lucide-react';
interface ExportOptionsProps {
  onExport: (options: ExportOptions) => void;
  isExporting?: boolean;
}
interface ExportOptions {
  dataType: string;
  format: string;
  includeHeaders: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}
export function ExportOptions({
  onExport,
  isExporting
}: ExportOptionsProps) {
  const [options, setOptions] = useState<ExportOptions>({
    dataType: 'products',
    format: 'csv',
    includeHeaders: true
  });
  const dataTypes = [{
    value: 'products',
    label: 'Products'
  }, {
    value: 'orders',
    label: 'Orders'
  }, {
    value: 'users',
    label: 'Users'
  }, {
    value: 'inventory',
    label: 'Inventory'
  }];
  const formats = [{
    value: 'csv',
    label: 'CSV'
  }, {
    value: 'excel',
    label: 'Excel'
  }, {
    value: 'pdf',
    label: 'PDF'
  }];
  return <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Export Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select label="Data Type" value={options.dataType} onChange={value => setOptions({
            ...options,
            dataType: value
          })} options={dataTypes} />
            <Select label="Export Format" value={options.format} onChange={value => setOptions({
            ...options,
            format: value
          })} options={formats} />
          </div>
        </div>
        <div className="space-y-4">
          <Switch label="Include Headers" checked={options.includeHeaders} onChange={checked => setOptions({
          ...options,
          includeHeaders: checked
        })} />
        </div>
        <div className="flex justify-end">
          <Button icon={<DownloadIcon size={16} />} onClick={() => onExport(options)} isLoading={isExporting}>
            Export Data
          </Button>
        </div>
      </div>
    </Card>;
}