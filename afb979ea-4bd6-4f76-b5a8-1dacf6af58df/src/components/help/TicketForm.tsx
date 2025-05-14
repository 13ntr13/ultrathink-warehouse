import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
interface TicketFormData {
  subject: string;
  category: string;
  priority: string;
  description: string;
}
interface TicketFormProps {
  onSubmit: (data: TicketFormData) => void;
}
export function TicketForm({
  onSubmit
}: TicketFormProps) {
  const [formData, setFormData] = useState<TicketFormData>({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  return <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Submit a Support Ticket
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Please provide details about your issue
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject
            </label>
            <input type="text" value={formData.subject} onChange={e => setFormData({
            ...formData,
            subject: e.target.value
          })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label="Category" value={formData.category} onChange={value => setFormData({
            ...formData,
            category: value
          })} options={[{
            value: 'technical',
            label: 'Technical Issue'
          }, {
            value: 'billing',
            label: 'Billing'
          }, {
            value: 'account',
            label: 'Account'
          }, {
            value: 'other',
            label: 'Other'
          }]} />
            <Select label="Priority" value={formData.priority} onChange={value => setFormData({
            ...formData,
            priority: value
          })} options={[{
            value: 'low',
            label: 'Low'
          }, {
            value: 'medium',
            label: 'Medium'
          }, {
            value: 'high',
            label: 'High'
          }]} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea value={formData.description} onChange={e => setFormData({
            ...formData,
            description: e.target.value
          })} rows={4} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" required />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Submit Ticket</Button>
        </div>
      </form>
    </Card>;
}