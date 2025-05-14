import React from 'react';
import { Card } from '../ui/Card';
import { DataTable } from '../shared/DataTable';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { DownloadIcon, ExternalLinkIcon } from 'lucide-react';
interface BillingRecord {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
  invoice: string;
}
interface BillingHistoryProps {
  records: BillingRecord[];
  onDownload: (id: string) => void;
  onViewInvoice: (id: string) => void;
}
export function BillingHistory({
  records,
  onDownload,
  onViewInvoice
}: BillingHistoryProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Paid</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="danger">Failed</Badge>;
      default:
        return null;
    }
  };
  const columns = [{
    key: 'date',
    header: 'Date',
    render: (record: BillingRecord) => <span className="text-gray-900 dark:text-gray-100">{record.date}</span>
  }, {
    key: 'invoice',
    header: 'Invoice',
    render: (record: BillingRecord) => <span className="text-gray-500 dark:text-gray-400">
          {record.invoice}
        </span>
  }, {
    key: 'amount',
    header: 'Amount',
    render: (record: BillingRecord) => <span className="font-medium text-gray-900 dark:text-gray-100">
          {record.amount}
        </span>
  }, {
    key: 'status',
    header: 'Status',
    render: (record: BillingRecord) => getStatusBadge(record.status)
  }, {
    key: 'actions',
    header: 'Actions',
    render: (record: BillingRecord) => <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="!p-2" onClick={() => onDownload(record.id)}>
            <DownloadIcon size={14} />
          </Button>
          <Button variant="outline" size="sm" className="!p-2" onClick={() => onViewInvoice(record.id)}>
            <ExternalLinkIcon size={14} />
          </Button>
        </div>
  }];
  return <Card title="Billing History" subtitle="View and download past invoices">
      <DataTable data={records} columns={columns} />
    </Card>;
}