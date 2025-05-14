import React from 'react';
import { Badge } from '../ui/Badge';
import { AlertCircleIcon, ShoppingCartIcon, UserIcon, BellIcon, CheckCircleIcon, XCircleIcon, ChevronRightIcon } from 'lucide-react';
export type NotificationType = 'system' | 'order' | 'user' | 'error' | 'success';
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}
interface NotificationItemProps {
  notification: Notification;
  onToggleRead: (id: string) => void;
  onClick: () => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}
export function NotificationItem({
  notification,
  onToggleRead,
  onClick,
  isSelected,
  onSelect
}: NotificationItemProps) {
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'system':
        return <BellIcon size={16} className="text-blue-500" />;
      case 'order':
        return <ShoppingCartIcon size={16} className="text-teal-500" />;
      case 'user':
        return <UserIcon size={16} className="text-purple-500" />;
      case 'error':
        return <XCircleIcon size={16} className="text-red-500" />;
      case 'success':
        return <CheckCircleIcon size={16} className="text-green-500" />;
      default:
        return <AlertCircleIcon size={16} className="text-gray-500" />;
    }
  };
  const getTypeLabel = (type: NotificationType) => {
    switch (type) {
      case 'system':
        return 'System';
      case 'order':
        return 'Order';
      case 'user':
        return 'User';
      case 'error':
        return 'Error';
      case 'success':
        return 'Success';
      default:
        return type;
    }
  };
  const getBadgeVariant = (type: NotificationType): any => {
    switch (type) {
      case 'system':
        return 'primary';
      case 'order':
        return 'info';
      case 'user':
        return 'secondary';
      case 'error':
        return 'danger';
      case 'success':
        return 'success';
      default:
        return 'secondary';
    }
  };
  return <div className={`group relative flex items-start space-x-4 p-4 rounded-lg transition-colors cursor-pointer
        ${notification.isRead ? 'bg-white dark:bg-gray-800' : 'bg-teal-50 dark:bg-teal-900/10'}
        ${isSelected ? 'ring-2 ring-teal-500' : 'hover:bg-gray-50 dark:hover:bg-gray-750'}
      `}>
      <div className="flex-none">
        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500" checked={isSelected} onChange={() => onSelect(notification.id)} onClick={e => e.stopPropagation()} />
      </div>
      <div className="flex-none">{getIcon(notification.type)}</div>
      <div className="flex-1 min-w-0" onClick={onClick}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant={getBadgeVariant(notification.type)}>
              {getTypeLabel(notification.type)}
            </Badge>
            {!notification.isRead && <span className="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-teal-500" />}
          </div>
          <time className="flex-shrink-0 text-xs text-gray-500">
            {notification.timestamp}
          </time>
        </div>
        <h4 className={`mt-1 text-sm font-medium ${notification.isRead ? 'text-gray-900 dark:text-gray-100' : 'text-teal-800 dark:text-teal-200'}`}>
          {notification.title}
        </h4>
        <p className={`mt-1 text-sm ${notification.isRead ? 'text-gray-500 dark:text-gray-400' : 'text-teal-600 dark:text-teal-300'}`}>
          {notification.message}
        </p>
      </div>
      <div className="flex-none self-center">
        <ChevronRightIcon size={16} className="text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400" />
      </div>
    </div>;
}