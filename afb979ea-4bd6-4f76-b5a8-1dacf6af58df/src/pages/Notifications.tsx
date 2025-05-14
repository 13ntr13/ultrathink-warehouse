import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { NotificationItem, type Notification } from '../components/notifications/NotificationItem';
import { NotificationFilters } from '../components/notifications/NotificationFilters';
import { EmptyState } from '../components/notifications/EmptyState';
import { BellIcon, CheckIcon, TrashIcon, SettingsIcon } from 'lucide-react';
// Mock notifications data
const mockNotifications: Notification[] = [{
  id: '1',
  type: 'order',
  title: 'New order received',
  message: 'Order #1234 has been placed by Acme Corp',
  timestamp: '5 minutes ago',
  isRead: false
}, {
  id: '2',
  type: 'system',
  title: 'System maintenance scheduled',
  message: 'System will be down for maintenance on Sunday at 2 AM',
  timestamp: '1 hour ago',
  isRead: true
}, {
  id: '3',
  type: 'error',
  title: 'Payment processing failed',
  message: 'Unable to process payment for Order #1235',
  timestamp: '2 hours ago',
  isRead: false
}, {
  id: '4',
  type: 'user',
  title: 'New user registration',
  message: 'John Doe has registered as a new customer',
  timestamp: '3 hours ago',
  isRead: true
}, {
  id: '5',
  type: 'success',
  title: 'Order shipped',
  message: 'Order #1233 has been shipped to customer',
  timestamp: '4 hours ago',
  isRead: false
}];
export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filter, setFilter] = useState('all');
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const handleToggleRead = (id: string) => {
    setNotifications(notifications.map(notification => notification.id === id ? {
      ...notification,
      isRead: !notification.isRead
    } : notification));
  };
  const handleSelectNotification = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const handleSelectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredNotifications.map(n => n.id));
    }
  };
  const handleMarkSelectedRead = () => {
    setNotifications(notifications.map(notification => selectedIds.includes(notification.id) ? {
      ...notification,
      isRead: true
    } : notification));
    setSelectedIds([]);
  };
  const handleDeleteSelected = () => {
    setNotifications(notifications.filter(notification => !selectedIds.includes(notification.id)));
    setSelectedIds([]);
  };
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.type === filter;
    const matchesStatus = status === 'all' || (status === 'unread' ? !notification.isRead : notification.isRead);
    const matchesSearch = search === '' || notification.title.toLowerCase().includes(search.toLowerCase()) || notification.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesStatus && matchesSearch;
  });
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your notifications and alerts
          </p>
        </div>
        <Button variant="outline" icon={<SettingsIcon size={16} />} onClick={() => {}}>
          Notification Settings
        </Button>
      </div>
      <Card>
        <div className="space-y-4">
          <NotificationFilters filter={filter} status={status} search={search} onFilterChange={setFilter} onStatusChange={setStatus} onSearchChange={setSearch} />
          {selectedIds.length > 0 && <div className="flex items-center justify-between py-2 px-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {selectedIds.length} selected
              </span>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" icon={<CheckIcon size={16} />} onClick={handleMarkSelectedRead}>
                  Mark as read
                </Button>
                <Button size="sm" variant="danger" icon={<TrashIcon size={16} />} onClick={handleDeleteSelected}>
                  Delete
                </Button>
              </div>
            </div>}
          {filteredNotifications.length > 0 ? <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredNotifications.map(notification => <NotificationItem key={notification.id} notification={notification} onToggleRead={handleToggleRead} onClick={() => handleToggleRead(notification.id)} isSelected={selectedIds.includes(notification.id)} onSelect={handleSelectNotification} />)}
            </div> : <EmptyState message={search ? 'No notifications match your search' : "You're all caught up!"} />}
        </div>
      </Card>
    </div>;
}