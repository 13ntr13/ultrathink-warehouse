import React from 'react';
import { DataTable } from '../shared/DataTable';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { PencilIcon, TrashIcon, UsersIcon, ShieldIcon } from 'lucide-react';
interface Role {
  id: string;
  name: string;
  description: string;
  users: number;
  permissions: number;
  type: 'system' | 'custom';
}
interface RolesTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
  onManageUsers: (role: Role) => void;
  onManagePermissions: (role: Role) => void;
}
export function RolesTable({
  roles,
  onEdit,
  onDelete,
  onManageUsers,
  onManagePermissions
}: RolesTableProps) {
  const getRoleBadgeVariant = (type: string): any => {
    return type === 'system' ? 'primary' : 'info';
  };
  const columns = [{
    key: 'name',
    header: 'Role Name',
    render: (role: Role) => <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {role.name}
          </span>
          <Badge variant={getRoleBadgeVariant(role.type)}>{role.type}</Badge>
        </div>
  }, {
    key: 'description',
    header: 'Description',
    render: (role: Role) => <span className="text-gray-500 dark:text-gray-400">
          {role.description}
        </span>
  }, {
    key: 'users',
    header: 'Users',
    render: (role: Role) => <Button variant="outline" size="sm" onClick={() => onManageUsers(role)} icon={<UsersIcon size={14} />}>
          {role.users} Users
        </Button>
  }, {
    key: 'permissions',
    header: 'Permissions',
    render: (role: Role) => <Button variant="outline" size="sm" onClick={() => onManagePermissions(role)} icon={<ShieldIcon size={14} />}>
          {role.permissions} Permissions
        </Button>
  }, {
    key: 'actions',
    header: 'Actions',
    render: (role: Role) => <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="!p-2" onClick={() => onEdit(role)}>
            <PencilIcon size={14} />
          </Button>
          {role.type !== 'system' && <Button variant="outline" size="sm" className="!p-2" onClick={() => onDelete(role)}>
              <TrashIcon size={14} />
            </Button>}
        </div>
  }];
  return <DataTable data={roles} columns={columns} />;
}