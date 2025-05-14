import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ExternalLinkIcon } from 'lucide-react';
interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  linkText: string;
}
export function ResourceCard({
  title,
  description,
  icon,
  link,
  linkText
}: ResourceCardProps) {
  return <Card className="h-full">
      <div className="flex flex-col h-full space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-500">
            {icon}
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>
        <p className="flex-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
        <Button variant="outline" className="w-full" icon={<ExternalLinkIcon size={16} />} onClick={() => window.open(link, '_blank')}>
          {linkText}
        </Button>
      </div>
    </Card>;
}