import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Switch } from '../components/ui/Switch';
import { Select } from '../components/ui/Select';
import { AvatarUpload } from '../components/ui/AvatarUpload';
import { UserIcon, BuildingIcon, BellIcon, ShieldIcon, SaveIcon, XIcon, KeyIcon, SmartphoneIcon, GlobeIcon } from 'lucide-react';
export function Settings() {
  const [isSaving, setIsSaving] = useState(false);
  // Mock state
  const [settings, setSettings] = useState({
    name: 'John Doe',
    email: 'john.doe@ultrathink.com',
    company: 'UltraThink Warehouse',
    phone: '+1 (555) 123-4567',
    language: 'en',
    notifications: {
      email: true,
      sms: false,
      inApp: true
    },
    security: {
      twoFactor: true
    }
  });
  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };
  const languages = [{
    value: 'en',
    label: 'English (US)'
  }, {
    value: 'es',
    label: 'Español'
  }, {
    value: 'fr',
    label: 'Français'
  }, {
    value: 'de',
    label: 'Deutsch'
  }];
  return <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="flex space-x-3">
          <Button variant="outline" icon={<XIcon size={16} />}>
            Cancel
          </Button>
          <Button icon={<SaveIcon size={16} />} onClick={handleSave} isLoading={isSaving}>
            Save changes
          </Button>
        </div>
      </div>
      {/* Profile Settings */}
      <Card title="Profile Settings" subtitle="Manage your personal information" icon={<UserIcon size={18} />}>
        <div className="space-y-6">
          <AvatarUpload currentAvatar="https://placehold.co/200x200/2C3E50/FFFFFF?text=JD" onAvatarChange={() => {}} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input type="text" value={settings.name} onChange={e => setSettings({
              ...settings,
              name: e.target.value
            })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input type="email" value={settings.email} onChange={e => setSettings({
              ...settings,
              email: e.target.value
            })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" />
            </div>
          </div>
        </div>
      </Card>
      {/* Organization Settings */}
      <Card title="Organization" subtitle="Manage your company information" icon={<BuildingIcon size={18} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company Name
            </label>
            <input type="text" value={settings.company} onChange={e => setSettings({
            ...settings,
            company: e.target.value
          })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input type="tel" value={settings.phone} onChange={e => setSettings({
            ...settings,
            phone: e.target.value
          })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" />
          </div>
        </div>
      </Card>
      {/* Preferences */}
      <Card title="Preferences" subtitle="Customize your experience" icon={<GlobeIcon size={18} />}>
        <div className="space-y-6">
          <Select label="Language" value={settings.language} onChange={value => setSettings({
          ...settings,
          language: value
        })} options={languages} />
        </div>
      </Card>
      {/* Notifications */}
      <Card title="Notifications" subtitle="Manage your notification preferences" icon={<BellIcon size={18} />}>
        <div className="space-y-6">
          <Switch label="Email Notifications" description="Receive notifications via email" checked={settings.notifications.email} onChange={checked => setSettings({
          ...settings,
          notifications: {
            ...settings.notifications,
            email: checked
          }
        })} />
          <Switch label="SMS Notifications" description="Receive notifications via SMS" checked={settings.notifications.sms} onChange={checked => setSettings({
          ...settings,
          notifications: {
            ...settings.notifications,
            sms: checked
          }
        })} />
          <Switch label="In-App Notifications" description="Receive notifications within the application" checked={settings.notifications.inApp} onChange={checked => setSettings({
          ...settings,
          notifications: {
            ...settings.notifications,
            inApp: checked
          }
        })} />
        </div>
      </Card>
      {/* Security */}
      <Card title="Security" subtitle="Manage your security settings" icon={<ShieldIcon size={18} />}>
        <div className="space-y-6">
          <Switch label="Two-Factor Authentication" description="Add an extra layer of security to your account" checked={settings.security.twoFactor} onChange={checked => setSettings({
          ...settings,
          security: {
            ...settings.security,
            twoFactor: checked
          }
        })} />
          {/* Active Sessions */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">
              Active Sessions
            </h4>
            <div className="space-y-4">
              {[{
              device: 'MacBook Pro',
              location: 'San Francisco, US',
              lastActive: 'Now',
              current: true
            }, {
              device: 'iPhone 12',
              location: 'San Francisco, US',
              lastActive: '2 hours ago',
              current: false
            }].map((session, index) => <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                      {session.device.includes('iPhone') ? <SmartphoneIcon size={16} className="text-gray-500" /> : <KeyIcon size={16} className="text-gray-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {session.device}
                        {session.current && <span className="ml-2 text-xs text-teal-500">
                            (Current)
                          </span>}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.location} • {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.current && <Button variant="danger" size="sm">
                      Revoke
                    </Button>}
                </div>)}
            </div>
          </div>
        </div>
      </Card>
    </div>;
}