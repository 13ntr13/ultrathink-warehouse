import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
}
interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  initialData?: Partial<UserFormData>;
  isEdit?: boolean;
}
export function UserModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEdit = false
}: UserModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    password: '',
    role: initialData?.role || 'user'
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit User' : 'Add New User'} footer={<div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="userForm">
            {isEdit ? 'Save Changes' : 'Create User'}
          </Button>
        </div>}>
      <form id="userForm" onSubmit={handleSubmit} className="space-y-4">
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
        {!isEdit && <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input type="password" value={formData.password} onChange={e => setFormData({
          ...formData,
          password: e.target.value
        })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" required={!isEdit} />
          </div>}
        <Select label="Role" value={formData.role} onChange={value => setFormData({
        ...formData,
        role: value
      })} options={[{
        value: 'admin',
        label: 'Admin'
      }, {
        value: 'manager',
        label: 'Manager'
      }, {
        value: 'user',
        label: 'User'
      }]} />
      </form>
    </Modal>;
}