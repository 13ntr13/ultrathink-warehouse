import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Notifications } from './pages/Notifications';
import { Users } from './pages/Users';
import { ProductsOrders } from './pages/ProductsOrders';
import { AdminLayout } from './layouts/AdminLayout';
import { Reports } from './pages/Reports';
import { Profile } from './pages/Profile';
import { AccessRoles } from './pages/AccessRoles';
import { SidebarCustomization } from './pages/SidebarCustomization';
import { ImportExport } from './pages/ImportExport';
import { Integrations } from './pages/Integrations';
import { AuditLog } from './pages/AuditLog';
import { Help } from './pages/Help';
import { Error403 } from './pages/Error403';
import { Error404 } from './pages/Error404';
import { Error500 } from './pages/Error500';
import { Billing } from './pages/Billing';
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };
  // Render content based on current page
  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'settings':
        return <Settings />;
      case 'notifications':
        return <Notifications />;
      case 'users':
        return <Users />;
      case 'products':
      case 'orders':
        return <ProductsOrders />;
      case 'reports':
        return <Reports />;
      case 'profile':
        return <Profile />;
      case 'access-roles':
        return <AccessRoles />;
      case 'sidebar-customization':
        return <SidebarCustomization />;
      case 'import-export':
        return <ImportExport />;
      case 'integrations':
        return <Integrations />;
      case 'audit-log':
        return <AuditLog />;
      case 'help':
        return <Help />;
      case 'error-403':
        return <Error403 />;
      case 'error-404':
        return <Error404 />;
      case 'error-500':
        return <Error500 />;
      case 'billing':
        return <Billing />;
      default:
        return <Error404 />;
    }
  };
  return <ThemeProvider>
      {!isAuthenticated ? <Login onLogin={handleLogin} /> : <AdminLayout currentPage={currentPage} onNavigate={handleNavigate}>
          {renderContent()}
        </AdminLayout>}
    </ThemeProvider>;
}