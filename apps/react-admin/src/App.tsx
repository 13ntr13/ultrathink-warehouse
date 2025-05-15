import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './lib/theme';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import ProductsOrders from './pages/ProductsOrders';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import AccessRoles from './pages/AccessRoles';
import AuditLog from './pages/AuditLog';
import Billing from './pages/Billing';
import Help from './pages/Help';
import Integrations from './pages/Integrations';
import ImportExport from './pages/ImportExport';
import SidebarCustomization from './pages/SidebarCustomization';
import Error403 from './pages/Error403';
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products-orders" element={<ProductsOrders />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/access-roles" element={<AccessRoles />} />
          <Route path="/audit-log" element={<AuditLog />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/help" element={<Help />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/import-export" element={<ImportExport />} />
          <Route path="/sidebar-customization" element={<SidebarCustomization />} />
        </Route>

        {/* Error pages */}
        <Route path="/403" element={<Error403 />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/500" element={<Error500 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App; 