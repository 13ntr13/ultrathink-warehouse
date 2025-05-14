import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Switch } from '../ui/Switch';
import { Button } from '../ui/Button';
import { GripVerticalIcon, PinIcon } from 'lucide-react';
interface DraggableMenuItemProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  isVisible: boolean;
  isPinned: boolean;
  onToggleVisibility: (id: string) => void;
  onTogglePin: (id: string) => void;
}
export function DraggableMenuItem({
  id,
  icon,
  label,
  isVisible,
  isPinned,
  onToggleVisibility,
  onTogglePin
}: DraggableMenuItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };
  return <div ref={setNodeRef} style={style} className={`flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${isDragging ? 'shadow-lg' : ''}`}>
      <div className="flex items-center space-x-4">
        <button {...attributes} {...listeners} className="cursor-grab hover:text-teal-500 focus:outline-none">
          <GripVerticalIcon size={20} />
        </button>
        <div className="flex items-center space-x-3">
          <div className="text-gray-500 dark:text-gray-400">{icon}</div>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {label}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Switch label="" checked={isVisible} onChange={() => onToggleVisibility(id)} />
        <Button variant={isPinned ? 'primary' : 'outline'} size="sm" className="!p-2" onClick={() => onTogglePin(id)} icon={<PinIcon size={16} />} />
      </div>
    </div>;
}