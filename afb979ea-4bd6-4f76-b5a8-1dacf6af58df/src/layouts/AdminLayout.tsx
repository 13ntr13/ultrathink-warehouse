import React from 'react';
import { Sidebar } from '../components/Sidebar';
interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}
export function AdminLayout({
  children,
  currentPage,
  onNavigate
}: AdminLayoutProps) {
  return <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar onNavigate={onNavigate} currentPage={currentPage} />
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>;
}