import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { UserModal } from '../components/users/UserModal';
import { UserFilters } from '../components/users/UserFilters';
import { ConfirmationDialog } from '../components/users/ConfirmationDialog';
import { PlusIcon, TrashIcon, PencilIcon, ShieldIcon, UserIcon, MoreVerticalIcon } from 'lucide-react';
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive';
  lastActive: string;
}
// Mock data
const mockUsers: User[] = [{
  id: '1',
  name: 'John Doe',
  email: 'john.doe@ultrathink.com',
  role: 'admin',
  status: 'active',
  lastActive: 'Just now'
}, {
  id: '2',
  name: 'Jane Smith',
  email: 'jane.smith@ultrathink.com',
  role: 'manager',
  status: 'active',
  lastActive: '2 hours ago'
}, {
  id: '3',
  name: 'Mike Johnson',
  email: 'mike.j@ultrathink.com',
  role: 'user',
  status: 'inactive',
  lastActive: '3 days ago'
}];
export function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <ShieldIcon size={14} className="text-blue-500" />;
      case 'manager':
        return <div size={14} className="text-teal-500" />;
      case 'user':
        return <UserIcon size={14} className="text-purple-500" />;
      default:
        return null;
    }
  };
  const getRoleBadgeVariant = (role: string): any => {
    switch (role) {
      case 'admin':
        return 'primary';
      case 'manager':
        return 'info';
      case 'user':
        return 'secondary';
      default:
        return 'secondary';
    }
  };
  const handleDeleteSelected = () => {
    setUsers(users.filter(user => !selectedIds.includes(user.id)));
    setSelectedIds([]);
    setIsDeleteDialogOpen(false);
  };
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredUsers.map(user => user.id));
    } else {
      setSelectedIds([]);
    }
  };
  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesSearch = searchQuery === '' || user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage user accounts and permissions
          </p>
        </div>
        <Button icon={<PlusIcon size={16} />} onClick={() => setIsModalOpen(true)}>
          Add User
        </Button>
      </div>
      <Card>
        <div className="space-y-4">
          <UserFilters roleFilter={roleFilter} statusFilter={statusFilter} searchQuery={searchQuery} onRoleFilter={setRoleFilter} onStatusFilter={setStatusFilter} onSearch={setSearchQuery} />
          {selectedIds.length > 0 && <div className="flex items-center justify-between py-2 px-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {selectedIds.length} selected
              </span>
              <Button size="sm" variant="danger" icon={<TrashIcon size={16} />} onClick={() => setIsDeleteDialogOpen(true)}>
                Delete Selected
              </Button>
            </div>}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500" checked={selectedIds.length === filteredUsers.length && filteredUsers.length > 0} onChange={e => handleSelectAll(e.target.checked)} />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredUsers.map(user => <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500" checked={selectedIds.includes(user.id)} onChange={() => {
                    if (selectedIds.includes(user.id)) {
                      setSelectedIds(selectedIds.filter(id => id !== user.id));
                    } else {
                      setSelectedIds([...selectedIds, user.id]);
                    }
                  }} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {user.name}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant={getRoleBadgeVariant(user.role)} className="inline-flex items-center space-x-1">
                        {getRoleIcon(user.role)}
                        <span>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </Badge>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.lastActive}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="outline" size="sm" className="!p-1" onClick={() => {
                      setEditingUser(user);
                      setIsModalOpen(true);
                    }}>
                          <PencilIcon size={14} />
                        </Button>
                        <Button variant="outline" size="sm" className="!p-1" onClick={() => {}}>
                          <MoreVerticalIcon size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      <UserModal isOpen={isModalOpen} onClose={() => {
      setIsModalOpen(false);
      setEditingUser(null);
    }} onSubmit={data => {
      // Handle user creation/update
      setIsModalOpen(false);
      setEditingUser(null);
    }} initialData={editingUser || undefined} isEdit={!!editingUser} />
      <ConfirmationDialog isOpen={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={handleDeleteSelected} title="Delete Users" message={`Are you sure you want to delete ${selectedIds.length === 1 ? 'this user' : 'these users'}? This action cannot be undone.`} />
    </div>;
}