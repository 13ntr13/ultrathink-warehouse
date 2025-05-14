import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CheckIcon } from 'lucide-react';
interface PlanOption {
  name: string;
  price: string;
  interval: string;
  description: string;
  features: string[];
  recommended?: boolean;
}
interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function UpgradePlanModal({
  isOpen,
  onClose
}: UpgradePlanModalProps) {
  const plans: PlanOption[] = [{
    name: 'Professional',
    price: '$49.99',
    interval: 'month',
    description: 'Perfect for growing businesses',
    features: ['Unlimited warehouses', 'Advanced analytics', 'Priority support', 'Basic integrations']
  }, {
    name: 'Enterprise',
    price: '$99.99',
    interval: 'month',
    description: 'For large-scale operations',
    features: ['Everything in Professional', 'Custom integrations', 'Enterprise features', '24/7 phone support', 'Dedicated account manager'],
    recommended: true
  }];
  return <Modal isOpen={isOpen} onClose={onClose} title="Upgrade Your Plan" size="lg">
      <div className="space-y-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Choose the plan that best fits your needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plans.map(plan => <div key={plan.name} className={`relative rounded-lg border ${plan.recommended ? 'border-teal-500 dark:border-teal-400' : 'border-gray-200 dark:border-gray-700'} p-6 space-y-4`}>
              {plan.recommended && <Badge variant="success" className="absolute -top-3 right-4">
                  Recommended
                </Badge>}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {plan.price}
                </span>
                <span className="ml-1 text-gray-500 dark:text-gray-400">
                  /{plan.interval}
                </span>
              </div>
              <ul className="space-y-3">
                {plan.features.map(feature => <li key={feature} className="flex items-start">
                    <CheckIcon size={16} className="mt-1 mr-2 text-teal-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>)}
              </ul>
              <Button variant={plan.recommended ? 'primary' : 'outline'} className="w-full" onClick={onClose}>
                Select {plan.name}
              </Button>
            </div>)}
        </div>
      </div>
    </Modal>;
}