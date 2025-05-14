import React, { useState } from 'react';
import { DataTable } from '../shared/DataTable';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { toast } from 'sonner';
import { CopyIcon, RefreshCwIcon, TrashIcon, CheckIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
interface APIKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  permissions: string[];
  status: 'active' | 'expired' | 'revoked';
}
interface APIKeyTableProps {
  keys: APIKey[];
  onRevoke: (id: string) => void;
  onRegenerate: (id: string) => void;
}
export function APIKeyTable({
  keys,
  onRevoke,
  onRegenerate
}: APIKeyTableProps) {
  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]);
  };
  const copyToClipboard = (id: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('API key copied to clipboard');
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'expired':
        return <Badge variant="warning">Expired</Badge>;
      case 'revoked':
        return <Badge variant="danger">Revoked</Badge>;
      default:
        return null;
    }
  };
  const columns = [{
    key: 'name',
    header: 'Name',
    render: (key: APIKey) => <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {key.name}
          </div>
          <div className="mt-1 flex items-center space-x-2">
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {visibleKeys.includes(key.id) ? key.key : '•'.repeat(20) + key.key.slice(-4)}
            </code>
            <Button variant="outline" size="sm" className="!p-1" onClick={() => toggleKeyVisibility(key.id)}>
              {visibleKeys.includes(key.id) ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
            </Button>
            <Button variant="outline" size="sm" className="!p-1" onClick={() => copyToClipboard(key.id, key.key)}>
              {copiedId === key.id ? <CheckIcon size={14} className="text-green-500" /> : <CopyIcon size={14} />}
            </Button>
          </div>
        </div>
  }, {
    key: 'permissions',
    header: 'Permissions',
    render: (key: APIKey) => <div className="flex flex-wrap gap-1">
          {key.permissions.map(permission => <Badge key={permission} variant="secondary">
              {permission}
            </Badge>)}
        </div>
  }, {
    key: 'dates',
    header: 'Dates',
    render: (key: APIKey) => <div className="space-y-1 text-sm">
          <div className="text-gray-500">Created: {key.createdAt}</div>
          {key.lastUsed && <div className="text-gray-500">Last used: {key.lastUsed}</div>}
        </div>
  }, {
    key: 'status',
    header: 'Status',
    render: (key: APIKey) => getStatusBadge(key.status)
  }, {
    key: 'actions',
    header: 'Actions',
    render: (key: APIKey) => <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="!p-2" onClick={() => onRegenerate(key.id)}>
            <RefreshCwIcon size={14} />
          </Button>
          <Button variant="outline" size="sm" className="!p-2" onClick={() => onRevoke(key.id)}>
            <TrashIcon size={14} />
          </Button>
        </div>
  }];
  return <DataTable data={keys} columns={columns} />;
}