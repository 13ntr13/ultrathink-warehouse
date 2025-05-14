import React from 'react';
import { Card } from '../ui/Card';
interface PreviewMenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  isVisible: boolean;
  isPinned: boolean;
}
interface PreviewSidebarProps {
  items: PreviewMenuItem[];
  isCollapsed?: boolean;
}
export function PreviewSidebar({
  items,
  isCollapsed = false
}: PreviewSidebarProps) {
  const visibleItems = items.filter(item => item.isVisible);
  return <Card className="w-64 h-[600px] bg-gray-900 text-white p-4">
      <div className="mb-6">
        <div className="h-8 bg-gray-800 rounded-md" />
      </div>
      <nav className="space-y-1">
        {visibleItems.map(item => <div key={item.id} className={`
              flex items-center px-3 py-2 rounded-md transition-colors
              ${item.isPinned ? 'bg-teal-500 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
            `}>
            <span className="mr-3">{item.icon}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </div>)}
      </nav>
    </Card>;
}