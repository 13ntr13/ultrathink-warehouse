import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { DataTable } from '../shared/DataTable';
import { SearchIcon, UserPlusIcon, UserMinusIcon } from 'lucide-react';
interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  assigned: boolean;
}
interface UserAssignmentProps {
  users: User[];
  onAssignUser: (userId: string) => void;
  onUnassignUser: (userId: string) => void;
}
export function UserAssignment({
  users,
  onAssignUser,
  onUnassignUser
}: UserAssignmentProps) {
  const [search, setSearch] = useState('');
  const columns = [{
    key: 'name',
    header: 'Name',
    render: (user: User) => <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {user.name}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
  }, {
    key: 'department',
    header: 'Department',
    render: (user: User) => <Badge variant="secondary">{user.department}</Badge>
  }, {
    key: 'actions',
    header: 'Actions',
    render: (user: User) => <Button variant={user.assigned ? 'outline' : 'primary'} size="sm" onClick={() => user.assigned ? onUnassignUser(user.id) : onAssignUser(user.id)} icon={user.assigned ? <UserMinusIcon size={14} /> : <UserPlusIcon size={14} />}>
          {user.assigned ? 'Remove' : 'Assign'}
        </Button>
  }];
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()));
  return <Card>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon size={16} className="text-gray-400" />
            </div>
            <input type="search" value={search} onChange={e => setSearch(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm" placeholder="Search users..." />
          </div>
        </div>
        <DataTable data={filteredUsers} columns={columns} />
      </div>
    </Card>;
}