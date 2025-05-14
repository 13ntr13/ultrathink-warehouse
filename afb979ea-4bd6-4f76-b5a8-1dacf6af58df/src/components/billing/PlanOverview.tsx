import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowUpIcon, AlertCircleIcon, CheckIcon } from 'lucide-react';
interface PlanFeature {
  name: string;
  included: boolean;
}
interface PlanOverviewProps {
  currentPlan: {
    name: string;
    price: string;
    interval: string;
    status: 'active' | 'past_due' | 'canceled';
    renewalDate: string;
    features: PlanFeature[];
  };
  onUpgrade: () => void;
  onCancel: () => void;
}
export function PlanOverview({
  currentPlan,
  onUpgrade,
  onCancel
}: PlanOverviewProps) {
  const getStatusBadge = () => {
    switch (currentPlan.status) {
      case 'active':
        return <Badge variant="success" className="flex items-center gap-1">
            <CheckIcon size={14} />
            Active
          </Badge>;
      case 'past_due':
        return <Badge variant="danger" className="flex items-center gap-1">
            <AlertCircleIcon size={14} />
            Past Due
          </Badge>;
      case 'canceled':
        return <Badge variant="secondary">Canceled</Badge>;
    }
  };
  return <Card>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Current Plan
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your subscription and billing
            </p>
          </div>
          {getStatusBadge()}
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {currentPlan.price}
          </span>
          <span className="ml-1 text-gray-500 dark:text-gray-400">
            /{currentPlan.interval}
          </span>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {currentPlan.name} Plan Features
            </h3>
            <ul className="mt-4 space-y-3">
              {currentPlan.features.map((feature, index) => <li key={index} className="flex items-start">
                  <div className={`flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full ${feature.included ? 'bg-teal-50 dark:bg-teal-900/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
                    <CheckIcon size={12} className={feature.included ? 'text-teal-500' : 'text-gray-400'} />
                  </div>
                  <span className={`ml-3 text-sm ${feature.included ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {feature.name}
                  </span>
                </li>)}
            </ul>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Next billing date
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {currentPlan.renewalDate}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button icon={<ArrowUpIcon size={16} />} onClick={onUpgrade}>
            Upgrade Plan
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel Subscription
          </Button>
        </div>
      </div>
    </Card>;
}