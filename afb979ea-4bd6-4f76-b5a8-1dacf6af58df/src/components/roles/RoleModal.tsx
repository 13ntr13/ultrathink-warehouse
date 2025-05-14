import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
interface RoleFormData {
  name: string;
  description: string;
  type: 'system' | 'custom';
}
interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RoleFormData) => void;
  initialData?: Partial<RoleFormData>;
  isEdit?: boolean;
}
export function RoleModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEdit = false
}: RoleModalProps) {
  const [formData, setFormData] = useState<RoleFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    type: initialData?.type || 'custom'
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Role' : 'Create New Role'} footer={<div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="roleForm">
            {isEdit ? 'Save Changes' : 'Create Role'}
          </Button>
        </div>}>
      <form id="roleForm" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Role Name
          </label>
          <input type="text" value={formData.name} onChange={e => setFormData({
          ...formData,
          name: e.target.value
        })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea value={formData.description} onChange={e => setFormData({
          ...formData,
          description: e.target.value
        })} rows={3} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" />
        </div>
      </form>
    </Modal>;
}