import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { PhoneIcon, MessageSquareIcon, MailIcon, ClockIcon } from 'lucide-react';
interface SupportContactProps {
  onStartChat: () => void;
  onCallSupport: () => void;
  onEmailSupport: () => void;
}
export function SupportContact({
  onStartChat,
  onCallSupport,
  onEmailSupport
}: SupportContactProps) {
  return <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Contact Support
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get in touch with our support team through your preferred channel
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center" onClick={onStartChat}>
            <MessageSquareIcon size={24} className="mb-2 text-teal-500" />
            <span className="font-medium">Live Chat</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Typical response: 2 mins
            </span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center" onClick={onCallSupport}>
            <PhoneIcon size={24} className="mb-2 text-teal-500" />
            <span className="font-medium">Phone Support</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Mon-Fri, 9AM-6PM EST
            </span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center" onClick={onEmailSupport}>
            <MailIcon size={24} className="mb-2 text-teal-500" />
            <span className="font-medium">Email Support</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Response within 24h
            </span>
          </Button>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <ClockIcon size={16} className="mr-1" />
            Business hours: 9:00 AM - 6:00 PM EST
          </div>
          <Button variant="link" size="sm">
            View support hours
          </Button>
        </div>
      </div>
    </Card>;
}