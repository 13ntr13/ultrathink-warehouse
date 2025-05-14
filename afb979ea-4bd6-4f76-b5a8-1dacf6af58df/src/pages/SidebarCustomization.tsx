import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Switch } from '../components/ui/Switch';
import { CustomizationControls } from '../components/sidebar/CustomizationControls';
import { PreviewSidebar } from '../components/sidebar/PreviewSidebar';
import { LayoutDashboardIcon, UsersIcon, PackageIcon, ShoppingCartIcon, BarChartIcon, SettingsIcon, BellIcon, ShieldIcon } from 'lucide-react';
import { toast } from 'sonner';
const defaultItems = [{
  id: 'dashboard',
  label: 'Dashboard',
  icon: <LayoutDashboardIcon size={18} />,
  isVisible: true,
  isPinned: true
}, {
  id: 'notifications',
  label: 'Notifications',
  icon: <BellIcon size={18} />,
  isVisible: true,
  isPinned: false
}, {
  id: 'users',
  label: 'Users',
  icon: <UsersIcon size={18} />,
  isVisible: true,
  isPinned: false
}, {
  id: 'products',
  label: 'Products',
  icon: <PackageIcon size={18} />,
  isVisible: true,
  isPinned: false
}, {
  id: 'orders',
  label: 'Orders',
  icon: <ShoppingCartIcon size={18} />,
  isVisible: true,
  isPinned: false
}, {
  id: 'reports',
  label: 'Reports',
  icon: <BarChartIcon size={18} />,
  isVisible: true,
  isPinned: false
}, {
  id: 'settings',
  label: 'Settings',
  icon: <SettingsIcon size={18} />,
  isVisible: true,
  isPinned: false
}, {
  id: 'roles',
  label: 'Roles',
  icon: <ShieldIcon size={18} />,
  isVisible: true,
  isPinned: false
}];
export function SidebarCustomization() {
  const [items, setItems] = useState(defaultItems);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleReset = () => {
    setItems(defaultItems);
    toast.success('Sidebar reset to default');
  };
  const handleSave = () => {
    // In a real app, save to backend
    toast.success('Sidebar customization saved');
  };
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sidebar Customization</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Customize your navigation menu layout and visibility
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
              <div>
                <h3 className="text-lg font-medium">Global Settings</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Configure sidebar behavior
                </p>
              </div>
              <Switch label="Collapsed Sidebar" checked={isCollapsed} onChange={() => setIsCollapsed(!isCollapsed)} />
            </div>
            <CustomizationControls items={items} onItemsChange={setItems} onReset={handleReset} onSave={handleSave} />
          </div>
        </Card>
        <div className="lg:pl-6">
          <div className="sticky top-6">
            <h3 className="text-lg font-medium mb-4">Preview</h3>
            <PreviewSidebar items={items} isCollapsed={isCollapsed} />
          </div>
        </div>
      </div>
    </div>;
}