import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { LayoutDashboardIcon, UsersIcon, PackageIcon, ShoppingCartIcon, BarChartIcon, SettingsIcon, LogOutIcon, SunIcon, MoonIcon, MenuIcon, XIcon, BellIcon } from 'lucide-react';
interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}
function SidebarLink({
  icon,
  label,
  active = false,
  onClick
}: SidebarLinkProps) {
  return <li>
      <button onClick={onClick} className={`flex items-center w-full p-2 rounded-md transition-colors ${active ? 'bg-teal-500 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}>
        <span className="mr-3">{icon}</span>
        <span>{label}</span>
      </button>
    </li>;
}
interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}
export function Sidebar({
  onNavigate,
  currentPage
}: SidebarProps) {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const links = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboardIcon size={18} />
  }, {
    id: 'notifications',
    label: 'Notifications',
    icon: <BellIcon size={18} />
  }, {
    id: 'users',
    label: 'Users',
    icon: <UsersIcon size={18} />
  }, {
    id: 'products',
    label: 'Products',
    icon: <PackageIcon size={18} />
  }, {
    id: 'orders',
    label: 'Orders',
    icon: <ShoppingCartIcon size={18} />
  }, {
    id: 'reports',
    label: 'Reports',
    icon: <BarChartIcon size={18} />
  }, {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon size={18} />
  }];
  return <>
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-40 w-full bg-gray-900 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="https://placehold.co/100x40/2C3E50/FFFFFF?text=UltraThink" alt="UltraThink Logo" className="h-8" />
        </div>
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-white">
          {collapsed ? <MenuIcon size={24} /> : <XIcon size={24} />}
        </button>
      </div>
      {/* Sidebar backdrop for mobile */}
      {!collapsed && <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setCollapsed(true)}></div>}
      {/* Sidebar */}
      <aside className={`${collapsed ? '-translate-x-full' : 'translate-x-0'} fixed top-0 left-0 z-40 w-64 h-full transition-transform lg:translate-x-0 bg-gray-900 text-white flex flex-col lg:pt-5 pt-16`}>
        <div className="px-4 mb-6 hidden lg:block">
          <img src="https://placehold.co/200x60/2C3E50/FFFFFF?text=UltraThink" alt="UltraThink Logo" className="h-10" />
        </div>
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {links.map(link => <SidebarLink key={link.id} icon={link.icon} label={link.label} active={currentPage === link.id} onClick={() => {
            onNavigate(link.id);
            setCollapsed(true);
          }} />)}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">Theme</span>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="Toggle theme">
              {theme === 'dark' ? <SunIcon size={18} className="text-amber-400" /> : <MoonIcon size={18} className="text-gray-400" />}
            </button>
          </div>
          <button className="flex items-center w-full p-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <LogOutIcon size={18} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>;
}