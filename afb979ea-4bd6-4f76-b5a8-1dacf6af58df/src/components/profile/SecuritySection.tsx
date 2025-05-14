import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Switch } from '../ui/Switch';
import { ShieldIcon, KeyIcon } from 'lucide-react';
interface SecuritySectionProps {
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
  };
  onChangePassword: () => void;
  onToggleTwoFactor: (enabled: boolean) => void;
}
export function SecuritySection({
  security,
  onChangePassword,
  onToggleTwoFactor
}: SecuritySectionProps) {
  return <Card title="Security" icon={<ShieldIcon size={18} />}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Password
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last changed {security.lastPasswordChange}
            </p>
          </div>
          <Button variant="outline" size="sm" icon={<KeyIcon size={16} />} onClick={onChangePassword}>
            Change Password
          </Button>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <Switch label="Two-Factor Authentication" description="Add an extra layer of security to your account" checked={security.twoFactorEnabled} onChange={onToggleTwoFactor} />
        </div>
      </div>
    </Card>;
}