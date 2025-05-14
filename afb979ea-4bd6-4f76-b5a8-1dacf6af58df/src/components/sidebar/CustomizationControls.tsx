import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DraggableMenuItem } from './DraggableMenuItem';
import { Button } from '../ui/Button';
import { RotateCcwIcon, SaveIcon } from 'lucide-react';
interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  isVisible: boolean;
  isPinned: boolean;
}
interface CustomizationControlsProps {
  items: MenuItem[];
  onItemsChange: (items: MenuItem[]) => void;
  onReset: () => void;
  onSave: () => void;
}
export function CustomizationControls({
  items,
  onItemsChange,
  onReset,
  onSave
}: CustomizationControlsProps) {
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
  }));
  const handleDragEnd = (event: any) => {
    const {
      active,
      over
    } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      onItemsChange(arrayMove(items, oldIndex, newIndex));
    }
  };
  const handleToggleVisibility = (id: string) => {
    onItemsChange(items.map(item => item.id === id ? {
      ...item,
      isVisible: !item.isVisible
    } : item));
  };
  const handleTogglePin = (id: string) => {
    onItemsChange(items.map(item => item.id === id ? {
      ...item,
      isPinned: !item.isPinned
    } : item));
  };
  const sortedItems = [...items].sort((a, b) => {
    if (a.isPinned === b.isPinned) return 0;
    return a.isPinned ? -1 : 1;
  });
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Menu Items
        </h3>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" icon={<RotateCcwIcon size={16} />} onClick={onReset}>
            Reset
          </Button>
          <Button size="sm" icon={<SaveIcon size={16} />} onClick={onSave}>
            Save Changes
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sortedItems} strategy={verticalListSortingStrategy}>
            {sortedItems.map(item => <DraggableMenuItem key={item.id} {...item} onToggleVisibility={handleToggleVisibility} onTogglePin={handleTogglePin} />)}
          </SortableContext>
        </DndContext>
      </div>
    </div>;
}