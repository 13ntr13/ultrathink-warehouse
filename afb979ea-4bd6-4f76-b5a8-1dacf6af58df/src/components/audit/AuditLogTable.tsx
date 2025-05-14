import React from 'react';
import { DataTable } from '../shared/DataTable';
import { ActionBadge, type ActionType } from './ActionBadge';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { UserIcon, EyeIcon } from 'lucide-react';
interface AuditLog {
  id: string;
  timestamp: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  action: ActionType;
  target: {
    type: string;
    name: string;
    id: string;
  };
  status: 'success' | 'error' | 'warning';
}
interface AuditLogTableProps {
  logs: AuditLog[];
  onViewDetails: (log: AuditLog) => void;
}
export function AuditLogTable({
  logs,
  onViewDetails
}: AuditLogTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="success">Success</Badge>;
      case 'error':
        return <Badge variant="danger">Error</Badge>;
      case 'warning':
        return <Badge variant="warning">Warning</Badge>;
      default:
        return null;
    }
  };
  const columns = [{
    key: 'timestamp',
    header: 'Timestamp',
    render: (log: AuditLog) => <span className="text-sm text-gray-500">{log.timestamp}</span>
  }, {
    key: 'user',
    header: 'User',
    render: (log: AuditLog) => <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <UserIcon size={16} className="text-gray-500" />
            </div>
          </div>
          <div>
            <div className="font-medium text-sm">{log.user.name}</div>
            <div className="text-xs text-gray-500">{log.user.email}</div>
          </div>
        </div>
  }, {
    key: 'action',
    header: 'Action',
    render: (log: AuditLog) => <ActionBadge type={log.action} />
  }, {
    key: 'target',
    header: 'Target',
    render: (log: AuditLog) => <div>
          <div className="font-medium text-sm">{log.target.name}</div>
          <div className="text-xs text-gray-500">
            {log.target.type} (ID: {log.target.id})
          </div>
        </div>
  }, {
    key: 'status',
    header: 'Status',
    render: (log: AuditLog) => getStatusBadge(log.status)
  }, {
    key: 'actions',
    header: '',
    render: (log: AuditLog) => <Button variant="outline" size="sm" className="!p-2" onClick={() => onViewDetails(log)}>
          <EyeIcon size={14} />
        </Button>
  }];
  return <DataTable data={logs} columns={columns} />;
}