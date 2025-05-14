import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { SmartphoneIcon, LaptopIcon, TabletIcon, MonitorIcon, XIcon } from 'lucide-react';
interface Session {
  id: string;
  device: string;
  type: 'mobile' | 'desktop' | 'tablet' | 'browser';
  location: string;
  lastActive: string;
  current: boolean;
}
interface SessionsSectionProps {
  sessions: Session[];
  onRevokeSession: (sessionId: string) => void;
}
export function SessionsSection({
  sessions,
  onRevokeSession
}: SessionsSectionProps) {
  const getDeviceIcon = (type: Session['type']) => {
    switch (type) {
      case 'mobile':
        return <SmartphoneIcon size={16} />;
      case 'tablet':
        return <TabletIcon size={16} />;
      case 'desktop':
        return <LaptopIcon size={16} />;
      default:
        return <MonitorIcon size={16} />;
    }
  };
  return <Card title="Active Sessions" icon={<MonitorIcon size={18} />}>
      <div className="space-y-4">
        {sessions.map(session => <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400">
                {getDeviceIcon(session.type)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {session.device}
                  {session.current && <span className="ml-2 text-xs text-teal-500">
                      (Current)
                    </span>}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {session.location} • Last active {session.lastActive}
                </p>
              </div>
            </div>
            {!session.current && <Button variant="outline" size="sm" icon={<XIcon size={14} />} onClick={() => onRevokeSession(session.id)}>
                Revoke
              </Button>}
          </div>)}
      </div>
    </Card>;
}