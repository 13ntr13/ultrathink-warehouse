import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Switch } from '../ui/Switch';
import { PowerIcon, ExternalLinkIcon, SettingsIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
interface IntegrationCardProps {
  integration: {
    id: string;
    name: string;
    description: string;
    icon: string;
    status: 'connected' | 'disconnected';
    lastSync?: string;
    docsUrl?: string;
  };
  onToggle: (id: string) => void;
  onConfigure: (id: string) => void;
}
export function IntegrationCard({
  integration,
  onToggle,
  onConfigure
}: IntegrationCardProps) {
  const isConnected = integration.status === 'connected';
  return <Card className="hover:border-teal-500 transition-colors">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <img src={integration.icon} alt={`${integration.name} icon`} className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {integration.name}
              </h3>
              <Badge variant={isConnected ? 'success' : 'secondary'} className="mt-1">
                {isConnected ? <CheckCircleIcon size={14} className="mr-1" /> : <XCircleIcon size={14} className="mr-1" />}
                {integration.status}
              </Badge>
            </div>
          </div>
          <Switch label="" checked={isConnected} onChange={() => onToggle(integration.id)} />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {integration.description}
        </p>
        {isConnected && integration.lastSync && <p className="text-xs text-gray-500 dark:text-gray-400">
            Last synced: {integration.lastSync}
          </p>}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" size="sm" icon={<SettingsIcon size={14} />} onClick={() => onConfigure(integration.id)}>
            Configure
          </Button>
          {integration.docsUrl && <Button variant="outline" size="sm" icon={<ExternalLinkIcon size={14} />} onClick={() => window.open(integration.docsUrl, '_blank')}>
              Documentation
            </Button>}
        </div>
      </div>
    </Card>;
}