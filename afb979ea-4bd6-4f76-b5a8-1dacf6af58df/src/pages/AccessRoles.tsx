import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { RolesTable } from '../components/roles/RolesTable';
import { RoleModal } from '../components/roles/RoleModal';
import { PermissionsGrid } from '../components/roles/PermissionsGrid';
import { UserAssignment } from '../components/roles/UserAssignment';
import { Modal } from '../components/ui/Modal';
import { PlusIcon, SearchIcon } from 'lucide-react';
// Mock data
const mockRoles = [{
  id: '1',
  name: 'Administrator',
  description: 'Full system access with all permissions',
  users: 3,
  permissions: 24,
  type: 'system' as const
}, {
  id: '2',
  name: 'Manager',
  description: 'Manage inventory and orders',
  users: 8,
  permissions: 16,
  type: 'custom' as const
}, {
  id: '3',
  name: 'Warehouse Staff',
  description: 'Basic warehouse operations',
  users: 15,
  permissions: 8,
  type: 'custom' as const
}];
const mockPermissions = [{
  id: '1',
  name: 'View Dashboard',
  description: 'Access to view main dashboard',
  group: 'Dashboard'
}, {
  id: '2',
  name: 'Manage Users',
  description: 'Create, edit, and delete users',
  group: 'User Management'
}, {
  id: '3',
  name: 'View Products',
  description: 'View product catalog',
  group: 'Products'
}, {
  id: '4',
  name: 'Manage Products',
  description: 'Create, edit, and delete products',
  group: 'Products'
}];
const mockUsers = [{
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  department: 'Management',
  assigned: true
}, {
  id: '2',
  name: 'Jane Smith',
  email: 'jane@example.com',
  department: 'Warehouse',
  assigned: false
}, {
  id: '3',
  name: 'Mike Johnson',
  email: 'mike@example.com',
  department: 'IT',
  assigned: false
}];
export function AccessRoles() {
  const [roles, setRoles] = useState(mockRoles);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const handleCreateRole = (data: any) => {
    console.log('Create role:', data);
    setIsRoleModalOpen(false);
  };
  const handleEditRole = (role: any) => {
    setSelectedRole(role);
    setIsRoleModalOpen(true);
  };
  const handleDeleteRole = (role: any) => {
    console.log('Delete role:', role);
  };
  const handleManagePermissions = (role: any) => {
    setSelectedRole(role);
    setIsPermissionsModalOpen(true);
  };
  const handleManageUsers = (role: any) => {
    setSelectedRole(role);
    setIsUsersModalOpen(true);
  };
  const filteredRoles = roles.filter(role => role.name.toLowerCase().includes(searchQuery.toLowerCase()) || role.description.toLowerCase().includes(searchQuery.toLowerCase()));
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Access & Roles</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage user roles and permissions
          </p>
        </div>
        <Button icon={<PlusIcon size={16} />} onClick={() => setIsRoleModalOpen(true)}>
          Create Role
        </Button>
      </div>
      <Card>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={16} className="text-gray-400" />
              </div>
              <input type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm" placeholder="Search roles..." />
            </div>
          </div>
          <RolesTable roles={filteredRoles} onEdit={handleEditRole} onDelete={handleDeleteRole} onManageUsers={handleManageUsers} onManagePermissions={handleManagePermissions} />
        </div>
      </Card>
      <RoleModal isOpen={isRoleModalOpen} onClose={() => {
      setIsRoleModalOpen(false);
      setSelectedRole(null);
    }} onSubmit={handleCreateRole} initialData={selectedRole} isEdit={!!selectedRole} />
      <Modal isOpen={isPermissionsModalOpen} onClose={() => setIsPermissionsModalOpen(false)} title={`Manage Permissions: ${selectedRole?.name}`} size="lg">
        <PermissionsGrid permissions={mockPermissions} selectedPermissions={selectedPermissions} onTogglePermission={id => setSelectedPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])} onSave={() => setIsPermissionsModalOpen(false)} />
      </Modal>
      <Modal isOpen={isUsersModalOpen} onClose={() => setIsUsersModalOpen(false)} title={`Manage Users: ${selectedRole?.name}`} size="lg">
        <UserAssignment users={mockUsers} onAssignUser={userId => console.log('Assign user:', userId)} onUnassignUser={userId => console.log('Unassign user:', userId)} />
      </Modal>
    </div>;
}