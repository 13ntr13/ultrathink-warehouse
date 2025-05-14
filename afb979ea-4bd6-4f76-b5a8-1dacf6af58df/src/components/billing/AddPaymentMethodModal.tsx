import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CreditCardIcon } from 'lucide-react';
interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function AddPaymentMethodModal({
  isOpen,
  onClose
}: AddPaymentMethodModalProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment method addition here
    onClose();
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Add Payment Method" footer={<div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="paymentForm">
            Add Payment Method
          </Button>
        </div>}>
      <form id="paymentForm" onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center space-x-3 mb-4">
          <CreditCardIcon size={24} className="text-gray-400" />
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Secure Payment Processing
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Card Number
          </label>
          <input type="text" value={formData.cardNumber} onChange={e => setFormData({
          ...formData,
          cardNumber: e.target.value
        })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" placeholder="1234 5678 9012 3456" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expiry Date
            </label>
            <input type="text" value={formData.expiryDate} onChange={e => setFormData({
            ...formData,
            expiryDate: e.target.value
          })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" placeholder="MM/YY" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              CVV
            </label>
            <input type="text" value={formData.cvv} onChange={e => setFormData({
            ...formData,
            cvv: e.target.value
          })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" placeholder="123" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cardholder Name
          </label>
          <input type="text" value={formData.name} onChange={e => setFormData({
          ...formData,
          name: e.target.value
        })} className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-gray-100 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm" placeholder="John Smith" required />
        </div>
      </form>
    </Modal>;
}