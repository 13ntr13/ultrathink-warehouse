import React from 'react';
import { Card } from '../ui/Card';
import { Switch } from '../ui/Switch';
import { Button } from '../ui/Button';
import { SaveIcon } from 'lucide-react';
interface Permission {
  id: string;
  name: string;
  description: string;
  group: string;
}
interface PermissionsGridProps {
  permissions: Permission[];
  selectedPermissions: string[];
  onTogglePermission: (permissionId: string) => void;
  onSave: () => void;
}
export function PermissionsGrid({
  permissions,
  selectedPermissions,
  onTogglePermission,
  onSave
}: PermissionsGridProps) {
  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.group]) {
      acc[permission.group] = [];
    }
    acc[permission.group].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Permissions</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Configure role permissions by feature
          </p>
        </div>
        <Button icon={<SaveIcon size={16} />} onClick={onSave}>
          Save Changes
        </Button>
      </div>
      <div className="grid gap-6">
        {Object.entries(groupedPermissions).map(([group, perms]) => <Card key={group} title={group}>
            <div className="space-y-4">
              {perms.map(permission => <div key={permission.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {permission.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {permission.description}
                    </p>
                  </div>
                  <Switch label="" checked={selectedPermissions.includes(permission.id)} onChange={() => onTogglePermission(permission.id)} />
                </div>)}
            </div>
          </Card>)}
      </div>
    </div>;
}