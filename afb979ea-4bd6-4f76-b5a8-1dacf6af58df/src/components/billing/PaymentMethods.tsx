import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CreditCardIcon, PlusIcon, TrashIcon, CheckCircleIcon } from 'lucide-react';
interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal';
  last4: string;
  expiryDate: string;
  isDefault: boolean;
}
interface PaymentMethodsProps {
  methods: PaymentMethod[];
  onAddMethod: () => void;
  onRemoveMethod: (id: string) => void;
  onSetDefault: (id: string) => void;
}
export function PaymentMethods({
  methods,
  onAddMethod,
  onRemoveMethod,
  onSetDefault
}: PaymentMethodsProps) {
  return <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Payment Methods
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your saved payment methods
            </p>
          </div>
          <Button variant="outline" icon={<PlusIcon size={16} />} onClick={onAddMethod}>
            Add Method
          </Button>
        </div>
        <div className="space-y-4">
          {methods.map(method => <div key={method.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                  <CreditCardIcon size={20} className="text-gray-500" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      •••• {method.last4}
                    </span>
                    {method.isDefault && <Badge variant="success" className="flex items-center gap-1">
                        <CheckCircleIcon size={12} />
                        Default
                      </Badge>}
                  </div>
                  <p className="text-sm text-gray-500">
                    Expires {method.expiryDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!method.isDefault && <>
                    <Button variant="outline" size="sm" onClick={() => onSetDefault(method.id)}>
                      Set Default
                    </Button>
                    <Button variant="outline" size="sm" className="!p-2" onClick={() => onRemoveMethod(method.id)}>
                      <TrashIcon size={14} />
                    </Button>
                  </>}
              </div>
            </div>)}
        </div>
      </div>
    </Card>;
}