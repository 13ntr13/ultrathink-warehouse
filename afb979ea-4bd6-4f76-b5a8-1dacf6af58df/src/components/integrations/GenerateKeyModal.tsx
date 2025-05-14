import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Switch } from '../ui/Switch';
interface Permission {
  id: string;
  name: string;
  description: string;
  group: string;
}
interface GenerateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (data: {
    name: string;
    permissions: string[];
  }) => void;
  availablePermissions: Permission[];
}
export function GenerateKeyModal({
  isOpen,
  onClose,
  onGenerate,
  availablePermissions
}: GenerateKeyModalProps) {
  const [name, setName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      name,
      permissions: selectedPermissions
    });
    setName('');
    setSelectedPermissions([]);
  };
  const togglePermission = (id: string) => {
    setSelectedPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };
  // Group permissions by their group
  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.group]) {
      acc[permission.group] = [];
    }
    acc[permission.group].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);
  return <Modal isOpen={isOpen} onClose={onClose} title="Generate New API Key" footer={<div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="generateKeyForm">
            Generate Key
          </Button>
        </div>}>
      <form id="generateKeyForm" onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Key Name
          </label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" placeholder="e.g., Production API Key" required />
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Permissions
          </label>
          {Object.entries(groupedPermissions).map(([group, permissions]) => <div key={group} className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {group}
              </h4>
              <div className="space-y-3">
                {permissions.map(permission => <Switch key={permission.id} label={permission.name} description={permission.description} checked={selectedPermissions.includes(permission.id)} onChange={() => togglePermission(permission.id)} />)}
              </div>
            </div>)}
        </div>
      </form>
    </Modal>;
}