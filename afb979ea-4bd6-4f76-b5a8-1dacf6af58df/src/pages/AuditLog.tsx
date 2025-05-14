import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { AuditLogTable } from '../components/audit/AuditLogTable';
import { LogFilters } from '../components/audit/LogFilters';
import { LogDetails } from '../components/audit/LogDetails';
import { toast } from 'sonner';
import { ClipboardListIcon } from 'lucide-react';
// Mock data
const mockLogs = [{
  id: '1',
  timestamp: '2024-02-20 14:30:25',
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin'
  },
  action: 'create',
  target: {
    type: 'Product',
    name: 'Wireless Headphones',
    id: 'PRD-001'
  },
  status: 'success',
  metadata: {
    previousStock: 0,
    newStock: 100,
    category: 'Electronics'
  },
  ipAddress: '192.168.1.1',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
}, {
  id: '2',
  timestamp: '2024-02-20 14:25:10',
  user: {
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Manager'
  },
  action: 'update',
  target: {
    type: 'Order',
    name: 'Order #1234',
    id: 'ORD-1234'
  },
  status: 'warning',
  metadata: {
    changes: {
      status: ['pending', 'processing'],
      notes: 'Customer requested priority shipping'
    }
  },
  ipAddress: '192.168.1.2',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
}, {
  id: '3',
  timestamp: '2024-02-20 14:20:05',
  user: {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'User'
  },
  action: 'delete',
  target: {
    type: 'Product',
    name: 'Old Inventory Item',
    id: 'PRD-999'
  },
  status: 'error',
  metadata: {
    reason: 'Product discontinued',
    relatedOrders: ['ORD-567', 'ORD-789']
  },
  ipAddress: '192.168.1.3',
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
}];
export function AuditLog() {
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [filters, setFilters] = useState({
    actionType: 'all',
    user: 'all',
    status: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const handleExport = () => {
    toast.success('Logs exported successfully');
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Audit Log</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track and monitor system activities
          </p>
        </div>
      </div>
      <Card>
        <div className="space-y-6">
          <LogFilters filters={filters} searchQuery={searchQuery} onFilterChange={setFilters} onSearch={setSearchQuery} onExport={handleExport} />
          <AuditLogTable logs={mockLogs} onViewDetails={log => setSelectedLog(log)} />
        </div>
      </Card>
      {selectedLog && <LogDetails isOpen={!!selectedLog} onClose={() => setSelectedLog(null)} log={selectedLog} />}
    </div>;
}