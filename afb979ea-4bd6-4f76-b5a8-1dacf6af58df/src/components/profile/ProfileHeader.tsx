import React from 'react';
import { Badge } from '../ui/Badge';
import { AvatarUpload } from '../ui/AvatarUpload';
import { Button } from '../ui/Button';
import { PencilIcon } from 'lucide-react';
interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  onEdit: () => void;
  onAvatarChange: (file: File) => void;
}
export function ProfileHeader({
  user,
  onEdit,
  onAvatarChange
}: ProfileHeaderProps) {
  const getRoleBadgeVariant = (role: string): any => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'primary';
      case 'manager':
        return 'info';
      default:
        return 'secondary';
    }
  };
  return <div className="relative rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex sm:space-x-6 mb-4 sm:mb-0">
          <div className="mb-4 sm:mb-0">
            <AvatarUpload currentAvatar={user.avatar} onAvatarChange={onAvatarChange} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {user.name}
              </h1>
              <Badge variant={getRoleBadgeVariant(user.role)}>
                {user.role}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
            <div className="mt-4">
              <Button variant="outline" size="sm" icon={<PencilIcon size={16} />} onClick={onEdit}>
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
}