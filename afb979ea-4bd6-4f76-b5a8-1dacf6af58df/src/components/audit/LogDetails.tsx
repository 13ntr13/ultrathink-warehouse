import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { ActionBadge } from './ActionBadge';
import { Badge } from '../ui/Badge';
import { UserIcon, ClockIcon, HashIcon } from 'lucide-react';
interface LogDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  log: {
    id: string;
    timestamp: string;
    user: {
      name: string;
      email: string;
      role: string;
    };
    action: any;
    target: {
      type: string;
      name: string;
      id: string;
    };
    status: string;
    metadata: Record<string, any>;
    ipAddress: string;
    userAgent: string;
  };
}
export function LogDetails({
  isOpen,
  onClose,
  log
}: LogDetailsProps) {
  return <Modal isOpen={isOpen} onClose={onClose} title="Activity Log Details" size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Timestamp
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon size={16} className="text-gray-400" />
              <span>{log.timestamp}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Action
            </div>
            <ActionBadge type={log.action} />
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">User</div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <UserIcon size={16} className="text-gray-500" />
                </div>
              </div>
              <div>
                <div className="font-medium">{log.user.name}</div>
                <div className="text-sm text-gray-500">{log.user.email}</div>
                <Badge variant="secondary" className="mt-1">
                  {log.user.role}
                </Badge>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Target
            </div>
            <div>
              <div className="font-medium">{log.target.name}</div>
              <div className="text-sm text-gray-500">
                {log.target.type} (ID: {log.target.id})
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-sm font-medium mb-2">Additional Details</h4>
          <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  IP Address:
                </span>{' '}
                {log.ipAddress}
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  User Agent:
                </span>{' '}
                {log.userAgent}
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Metadata:
              </div>
              <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto">
                {JSON.stringify(log.metadata, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </Modal>;
}