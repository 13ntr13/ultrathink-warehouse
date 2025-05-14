import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  department?: string;
  location?: string;
}
interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProfileFormData) => void;
  initialData: ProfileFormData;
}
export function EditProfileModal({
  isOpen,
  onClose,
  onSubmit,
  initialData
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<ProfileFormData>(initialData);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile" footer={<div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="profileForm">
            Save Changes
          </Button>
        </div>}>
      <form id="profileForm" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name
          </label>
          <input type="text" value={formData.name} onChange={e => setFormData({
          ...formData,
          name: e.target.value
        })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address
          </label>
          <input type="email" value={formData.email} onChange={e => setFormData({
          ...formData,
          email: e.target.value
        })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <input type="tel" value={formData.phone} onChange={e => setFormData({
          ...formData,
          phone: e.target.value
        })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Company
          </label>
          <input type="text" value={formData.company} onChange={e => setFormData({
          ...formData,
          company: e.target.value
        })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" />
        </div>
      </form>
    </Modal>;
}