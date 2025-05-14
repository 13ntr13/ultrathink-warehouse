import React, { useState } from 'react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { PersonalInfoSection } from '../components/profile/PersonalInfoSection';
import { SecuritySection } from '../components/profile/SecuritySection';
import { SessionsSection } from '../components/profile/SessionsSection';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
export function Profile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  // Mock data
  const [profile] = useState({
    name: 'John Doe',
    email: 'john.doe@ultrathink.com',
    phone: '+1 (555) 123-4567',
    company: 'UltraThink Warehouse',
    role: 'Admin',
    avatar: 'https://placehold.co/200x200/2C3E50/FFFFFF?text=JD'
  });
  const [security] = useState({
    twoFactorEnabled: true,
    lastPasswordChange: '2 months ago'
  });
  const [sessions] = useState([{
    id: '1',
    device: 'MacBook Pro',
    type: 'desktop' as const,
    location: 'San Francisco, US',
    lastActive: 'Now',
    current: true
  }, {
    id: '2',
    device: 'iPhone 12',
    type: 'mobile' as const,
    location: 'San Francisco, US',
    lastActive: '2 hours ago',
    current: false
  }, {
    id: '3',
    device: 'Chrome Browser',
    type: 'browser' as const,
    location: 'New York, US',
    lastActive: '3 days ago',
    current: false
  }]);
  const handleProfileUpdate = (data: any) => {
    console.log('Profile updated:', data);
    setIsEditModalOpen(false);
  };
  const handlePasswordChange = (data: any) => {
    console.log('Password changed:', data);
    setIsPasswordModalOpen(false);
  };
  const handleSessionRevoke = (sessionId: string) => {
    console.log('Session revoked:', sessionId);
  };
  const handleAvatarChange = (file: File) => {
    console.log('Avatar changed:', file);
  };
  return <div className="space-y-6">
      <ProfileHeader user={profile} onEdit={() => setIsEditModalOpen(true)} onAvatarChange={handleAvatarChange} />
      <div className="grid grid-cols-1 gap-6">
        <PersonalInfoSection info={profile} />
        <SecuritySection security={security} onChangePassword={() => setIsPasswordModalOpen(true)} onToggleTwoFactor={enabled => console.log('2FA:', enabled)} />
        <SessionsSection sessions={sessions} onRevokeSession={handleSessionRevoke} />
      </div>
      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSubmit={handleProfileUpdate} initialData={profile} />
      <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} title="Change Password" footer={<div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsPasswordModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="passwordForm">
              Update Password
            </Button>
          </div>}>
        <form id="passwordForm" onSubmit={e => {
        e.preventDefault();
        handlePasswordChange({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Password
            </label>
            <input type="password" className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input type="password" className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm New Password
            </label>
            <input type="password" className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" required />
          </div>
        </form>
      </Modal>
    </div>;
}