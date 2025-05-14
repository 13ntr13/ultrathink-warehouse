import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { DataTable } from '../shared/DataTable';
import { SearchIcon, FilterIcon, CheckIcon, XIcon, MoreVerticalIcon, UserIcon } from 'lucide-react';
interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: string;
  items: number;
}
const mockOrders: Order[] = [{
  id: 'ORD-001',
  customer: {
    name: 'John Doe',
    email: 'john@example.com'
  },
  date: '2024-02-20',
  status: 'pending',
  total: '$299.99',
  items: 3
}, {
  id: 'ORD-002',
  customer: {
    name: 'Jane Smith',
    email: 'jane@example.com'
  },
  date: '2024-02-19',
  status: 'shipped',
  total: '$199.99',
  items: 2
}, {
  id: 'ORD-003',
  customer: {
    name: 'Mike Johnson',
    email: 'mike@example.com'
  },
  date: '2024-02-18',
  status: 'delivered',
  total: '$499.99',
  items: 5
}];
export function OrdersView() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? mockOrders.map(o => o.id) : []);
  };
  const handleSelectOrder = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'processing':
        return <Badge variant="primary">Processing</Badge>;
      case 'shipped':
        return <Badge variant="info">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="success">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return null;
    }
  };
  const columns = [{
    key: 'id',
    header: 'Order ID',
    render: (order: Order) => <span className="font-medium text-gray-900 dark:text-gray-100">
          {order.id}
        </span>
  }, {
    key: 'customer',
    header: 'Customer',
    render: (order: Order) => <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <UserIcon size={16} className="text-gray-500" />
            </div>
          </div>
          <div className="ml-3">
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {order.customer.name}
            </div>
            <div className="text-sm text-gray-500">{order.customer.email}</div>
          </div>
        </div>
  }, {
    key: 'date',
    header: 'Date',
    render: (order: Order) => <span className="text-gray-500">{order.date}</span>
  }, {
    key: 'status',
    header: 'Status',
    render: (order: Order) => getStatusBadge(order.status)
  }, {
    key: 'total',
    header: 'Total',
    render: (order: Order) => <span className="font-medium">{order.total}</span>
  }, {
    key: 'actions',
    header: 'Actions',
    width: '100px',
    render: (order: Order) => <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" className="!p-1">
            <CheckIcon size={14} />
          </Button>
          <Button variant="outline" size="sm" className="!p-1">
            <XIcon size={14} />
          </Button>
          <Button variant="outline" size="sm" className="!p-1">
            <MoreVerticalIcon size={14} />
          </Button>
        </div>
  }];
  return <Card>
      <div className="space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex-1 min-w-0">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon size={16} className="text-gray-400" />
              </div>
              <input type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" placeholder="Search orders..." />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" icon={<FilterIcon size={16} />}>
              Filters
            </Button>
          </div>
        </div>
        {selectedIds.length > 0 && <div className="flex items-center justify-between py-2 px-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {selectedIds.length} selected
            </span>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" icon={<CheckIcon size={16} />}>
                Mark as Shipped
              </Button>
              <Button size="sm" variant="danger" icon={<XIcon size={16} />}>
                Cancel Orders
              </Button>
            </div>
          </div>}
        <DataTable data={mockOrders} columns={columns} selectable selectedIds={selectedIds} onSelectAll={handleSelectAll} onSelectItem={handleSelectOrder} />
      </div>
    </Card>;
}