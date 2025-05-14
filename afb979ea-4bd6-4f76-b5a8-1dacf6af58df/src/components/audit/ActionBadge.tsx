import React from 'react';
import { Badge } from '../ui/Badge';
import { PlusIcon, PencilIcon, TrashIcon, LogInIcon, LogOutIcon, ShieldIcon, FileIcon, SettingsIcon } from 'lucide-react';
export type ActionType = 'create' | 'update' | 'delete' | 'login' | 'logout' | 'permission' | 'export' | 'settings';
interface ActionBadgeProps {
  type: ActionType;
  className?: string;
}
export function ActionBadge({
  type,
  className = ''
}: ActionBadgeProps) {
  const getIcon = () => {
    switch (type) {
      case 'create':
        return <PlusIcon size={14} />;
      case 'update':
        return <PencilIcon size={14} />;
      case 'delete':
        return <TrashIcon size={14} />;
      case 'login':
        return <LogInIcon size={14} />;
      case 'logout':
        return <LogOutIcon size={14} />;
      case 'permission':
        return <ShieldIcon size={14} />;
      case 'export':
        return <FileIcon size={14} />;
      case 'settings':
        return <SettingsIcon size={14} />;
    }
  };
  const getVariant = (): any => {
    switch (type) {
      case 'create':
        return 'success';
      case 'update':
        return 'info';
      case 'delete':
        return 'danger';
      case 'login':
      case 'logout':
        return 'primary';
      case 'permission':
        return 'warning';
      default:
        return 'secondary';
    }
  };
  const getLabel = () => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  return <Badge variant={getVariant()} className={`flex items-center gap-1 ${className}`}>
      {getIcon()}
      <span>{getLabel()}</span>
    </Badge>;
}