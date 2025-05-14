import React from 'react';
import { Card } from '../ui/Card';
import { DataTable } from '../shared/DataTable';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { DownloadIcon, CheckCircleIcon, XCircleIcon, ClockIcon, RotateCcwIcon } from 'lucide-react';
interface HistoryItem {
  id: string;
  type: 'import' | 'export';
  dataType: string;
  fileName: string;
  status: 'completed' | 'failed' | 'processing';
  timestamp: string;
  size: string;
}
interface HistoryTableProps {
  items: HistoryItem[];
  onDownload: (id: string) => void;
  onRetry: (id: string) => void;
}
export function HistoryTable({
  items,
  onDownload,
  onRetry
}: HistoryTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success" className="flex items-center space-x-1">
            <CheckCircleIcon size={14} />
            <span>Completed</span>
          </Badge>;
      case 'failed':
        return <Badge variant="danger" className="flex items-center space-x-1">
            <XCircleIcon size={14} />
            <span>Failed</span>
          </Badge>;
      case 'processing':
        return <Badge variant="warning" className="flex items-center space-x-1">
            <ClockIcon size={14} />
            <span>Processing</span>
          </Badge>;
      default:
        return null;
    }
  };
  const columns = [{
    key: 'fileName',
    header: 'File Name',
    render: (item: HistoryItem) => <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {item.fileName}
          </div>
          <div className="text-sm text-gray-500">{item.size}</div>
        </div>
  }, {
    key: 'type',
    header: 'Type',
    render: (item: HistoryItem) => <Badge variant="secondary">
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </Badge>
  }, {
    key: 'dataType',
    header: 'Data',
    render: (item: HistoryItem) => <span className="capitalize">{item.dataType}</span>
  }, {
    key: 'status',
    header: 'Status',
    render: (item: HistoryItem) => getStatusBadge(item.status)
  }, {
    key: 'timestamp',
    header: 'Date',
    render: (item: HistoryItem) => <span className="text-gray-500">{item.timestamp}</span>
  }, {
    key: 'actions',
    header: 'Actions',
    width: '100px',
    render: (item: HistoryItem) => <div className="flex space-x-2">
          {item.status === 'completed' && <Button variant="outline" size="sm" className="!p-2" onClick={() => onDownload(item.id)}>
              <DownloadIcon size={14} />
            </Button>}
          {item.status === 'failed' && <Button variant="outline" size="sm" className="!p-2" onClick={() => onRetry(item.id)}>
              <RotateCcwIcon size={14} />
            </Button>}
        </div>
  }];
  return <Card title="History" subtitle="Recent imports and exports">
      <DataTable data={items} columns={columns} />
    </Card>;
}