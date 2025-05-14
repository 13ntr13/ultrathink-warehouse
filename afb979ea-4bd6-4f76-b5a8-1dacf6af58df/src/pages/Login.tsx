import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { EyeIcon, EyeOffIcon, ChevronDownIcon, UserIcon, KeyIcon } from 'lucide-react';
interface LoginProps {
  onLogin: () => void;
}
export function Login({
  onLogin
}: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showTestCredentials, setShowTestCredentials] = useState(false);
  const [role, setRole] = useState('user');
  const testCredentials = {
    admin: {
      email: 'admin@ultrathink.com',
      password: 'admin123'
    },
    manager: {
      email: 'manager@ultrathink.com',
      password: 'manager123'
    },
    user: {
      email: 'user@ultrathink.com',
      password: 'user123'
    }
  };
  const handleTestCredentials = (roleType: keyof typeof testCredentials) => {
    setRole(roleType);
    // In a real app, you would populate the form fields with the test credentials
    // For this demo, we'll just simulate a login
    setTimeout(() => {
      onLogin();
    }, 500);
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <div>
          <img className="mx-auto h-16 w-auto" src="https://placehold.co/300x100/2C3E50/FFFFFF?text=UltraThink" alt="UltraThink Warehouse" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Admin Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={e => {
        e.preventDefault();
        onLogin();
      }}>
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={18} className="text-gray-400" />
                </div>
                <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" placeholder="Email address" />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyIcon size={18} className="text-gray-400" />
                </div>
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required className="appearance-none rounded-md relative block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" placeholder="Password" />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none">
                    {showPassword ? <EyeOffIcon size={18} aria-hidden="true" /> : <EyeIcon size={18} aria-hidden="true" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <select id="role" name="role" value={role} onChange={e => setRole(e.target.value)} className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm">
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
          <div>
            <Button fullWidth type="submit">
              Sign in
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
                Or
              </span>
            </div>
          </div>
          <div className="relative">
            <button type="button" onClick={() => setShowTestCredentials(!showTestCredentials)} className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              <span>Use Test Credentials</span>
              <ChevronDownIcon size={16} className={`transition-transform ${showTestCredentials ? 'transform rotate-180' : ''}`} />
            </button>
            {showTestCredentials && <div className="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-gray-700 shadow-lg">
                <div className="py-1">
                  {Object.entries(testCredentials).map(([roleType, creds]) => <button key={roleType} type="button" onClick={() => handleTestCredentials(roleType as keyof typeof testCredentials)} className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                      {roleType.charAt(0).toUpperCase() + roleType.slice(1)}:{' '}
                      {creds.email}
                    </button>)}
                </div>
              </div>}
          </div>
        </form>
      </div>
    </div>;
}