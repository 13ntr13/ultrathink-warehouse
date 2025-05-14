import React from 'react';
interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}
interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}
export function TabNavigation({
  tabs,
  activeTab,
  onChange
}: TabNavigationProps) {
  return <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map(tab => <button key={tab.id} onClick={() => onChange(tab.id)} className={`
              group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === tab.id ? 'border-teal-500 text-teal-600 dark:text-teal-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}
            `}>
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
            {tab.count !== undefined && <span className={`ml-2 rounded-full py-0.5 px-2.5 text-xs font-medium
                ${activeTab === tab.id ? 'bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-400' : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-400'}
              `}>
                {tab.count}
              </span>}
          </button>)}
      </nav>
    </div>;
}