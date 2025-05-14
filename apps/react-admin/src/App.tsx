import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth } from './lib/auth'
import AdminLayout from './layouts/AdminLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Users from './pages/Users'
import Settings from './pages/Settings'
import SharedComponents from './pages/SharedComponents'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Login />
  }

  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/shared-components" element={<SharedComponents />} />
        </Routes>
      </AdminLayout>
    </Router>
  )
}

export default App 