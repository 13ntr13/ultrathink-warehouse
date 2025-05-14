import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PackageIcon, ShoppingCartIcon, UsersIcon, TruckIcon, AlertCircleIcon, TrendingUpIcon, BarChart2Icon, ArrowRightIcon } from 'lucide-react';
export function Dashboard() {
  // Mock data
  const stats = [{
    title: 'Total Products',
    value: '1,284',
    icon: <PackageIcon size={20} />,
    change: '+12%',
    changeType: 'positive'
  }, {
    title: 'Active Orders',
    value: '42',
    icon: <ShoppingCartIcon size={20} />,
    change: '-3%',
    changeType: 'negative'
  }, {
    title: 'Total Users',
    value: '891',
    icon: <UsersIcon size={20} />,
    change: '+7%',
    changeType: 'positive'
  }, {
    title: 'Deliveries Today',
    value: '16',
    icon: <TruckIcon size={20} />,
    change: '+24%',
    changeType: 'positive'
  }];
  const recentOrders = [{
    id: 'ORD-7291',
    customer: 'Acme Corp',
    date: '2023-06-12',
    status: 'Shipped',
    amount: '$1,240.00'
  }, {
    id: 'ORD-7290',
    customer: 'Globex Inc',
    date: '2023-06-12',
    status: 'Processing',
    amount: '$890.50'
  }, {
    id: 'ORD-7289',
    customer: 'Wayne Enterprises',
    date: '2023-06-11',
    status: 'Delivered',
    amount: '$2,370.25'
  }, {
    id: 'ORD-7288',
    customer: 'Stark Industries',
    date: '2023-06-11',
    status: 'Pending',
    amount: '$1,450.00'
  }];
  const alerts = [{
    id: 1,
    message: 'Low stock alert: 5 products need restocking',
    type: 'warning'
  }, {
    id: 2,
    message: 'New order #ORD-7292 requires approval',
    type: 'info'
  }, {
    id: 3,
    message: 'System maintenance scheduled for tomorrow at 2 AM',
    type: 'info'
  }];
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: Today at 10:45 AM
        </p>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => <Card key={index} className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
              </div>
              <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-full text-teal-500">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stat.change}
              </span>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                from last month
              </span>
            </div>
          </Card>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card title="Recent Orders" subtitle="Last 4 orders from customers" icon={<ShoppingCartIcon size={18} />} className="lg:col-span-2" footer={<a href="#" className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center">
              View all orders
              <ArrowRightIcon size={16} className="ml-1" />
            </a>}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentOrders.map(order => <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-2 py-3 whitespace-nowrap text-sm font-medium">
                      {order.id}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-sm">
                      {order.customer}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {order.date}
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap">
                      <Badge variant={order.status === 'Delivered' ? 'success' : order.status === 'Shipped' ? 'info' : order.status === 'Processing' ? 'warning' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-sm font-medium">
                      {order.amount}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </Card>
        {/* Alerts & Notifications */}
        <Card title="Alerts & Notifications" subtitle="System alerts and notifications" icon={<AlertCircleIcon size={18} />}>
          <div className="space-y-4">
            {alerts.map(alert => <div key={alert.id} className={`p-3 rounded-md ${alert.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'}`}>
                <div className="flex">
                  <div className="flex-shrink-0">
                    {alert.type === 'warning' ? <AlertCircleIcon size={18} className="text-amber-500" /> : <TrendingUpIcon size={18} className="text-blue-500" />}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{alert.message}</p>
                  </div>
                </div>
              </div>)}
          </div>
        </Card>
      </div>
      {/* Quick Access Shortcuts */}
      <Card title="Quick Access" icon={<BarChart2Icon size={18} />}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center">
            <PackageIcon size={24} className="mx-auto text-teal-500" />
            <span className="block mt-2 text-sm">Inventory</span>
          </button>
          <button className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center">
            <ShoppingCartIcon size={24} className="mx-auto text-teal-500" />
            <span className="block mt-2 text-sm">New Order</span>
          </button>
          <button className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center">
            <UsersIcon size={24} className="mx-auto text-teal-500" />
            <span className="block mt-2 text-sm">Users</span>
          </button>
          <button className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center">
            <TruckIcon size={24} className="mx-auto text-teal-500" />
            <span className="block mt-2 text-sm">Shipping</span>
          </button>
        </div>
      </Card>
    </div>;
}