import React, { useState } from 'react';
import { toast } from 'sonner';
import { PlanOverview } from '../components/billing/PlanOverview';
import { PaymentMethods } from '../components/billing/PaymentMethods';
import { BillingHistory } from '../components/billing/BillingHistory';
import { UpgradePlanModal } from '../components/billing/UpgradePlanModal';
import { AddPaymentMethodModal } from '../components/billing/AddPaymentMethodModal';
// Mock data
const currentPlan = {
  name: 'Professional',
  price: '$49.99',
  interval: 'month',
  status: 'active' as const,
  renewalDate: 'Aug 1, 2024',
  features: [{
    name: 'Unlimited warehouses',
    included: true
  }, {
    name: 'Advanced analytics',
    included: true
  }, {
    name: 'Priority support',
    included: true
  }, {
    name: 'Custom integrations',
    included: false
  }, {
    name: 'Enterprise features',
    included: false
  }]
};
const paymentMethods = [{
  id: '1',
  type: 'credit_card' as const,
  last4: '4242',
  expiryDate: '12/24',
  isDefault: true
}, {
  id: '2',
  type: 'credit_card' as const,
  last4: '1234',
  expiryDate: '10/25',
  isDefault: false
}];
const billingHistory = [{
  id: '1',
  date: 'Jul 1, 2023',
  amount: '$49.99',
  status: 'paid' as const,
  invoice: 'INV-2023-001'
}, {
  id: '2',
  date: 'Jun 1, 2023',
  amount: '$49.99',
  status: 'paid' as const,
  invoice: 'INV-2023-002'
}, {
  id: '3',
  date: 'May 1, 2023',
  amount: '$49.99',
  status: 'paid' as const,
  invoice: 'INV-2023-003'
}];
export function Billing() {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const handleUpgrade = () => {
    setIsUpgradeModalOpen(true);
  };
  const handleCancel = () => {
    toast.error('Please contact support to cancel your subscription');
  };
  const handleAddPaymentMethod = () => {
    setIsAddPaymentModalOpen(true);
  };
  const handleRemovePaymentMethod = (id: string) => {
    toast.success('Payment method removed successfully');
  };
  const handleSetDefaultPaymentMethod = (id: string) => {
    toast.success('Default payment method updated');
  };
  const handleDownloadInvoice = (id: string) => {
    toast.success('Invoice downloaded');
  };
  const handleViewInvoice = (id: string) => {
    toast.success('Opening invoice in new tab');
  };
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your subscription, payment methods, and billing history
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PlanOverview currentPlan={currentPlan} onUpgrade={handleUpgrade} onCancel={handleCancel} />
        </div>
        <div>
          <PaymentMethods methods={paymentMethods} onAddMethod={handleAddPaymentMethod} onRemoveMethod={handleRemovePaymentMethod} onSetDefault={handleSetDefaultPaymentMethod} />
        </div>
      </div>
      <BillingHistory records={billingHistory} onDownload={handleDownloadInvoice} onViewInvoice={handleViewInvoice} />
      <UpgradePlanModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
      <AddPaymentMethodModal isOpen={isAddPaymentModalOpen} onClose={() => setIsAddPaymentModalOpen(false)} />
    </div>;
}