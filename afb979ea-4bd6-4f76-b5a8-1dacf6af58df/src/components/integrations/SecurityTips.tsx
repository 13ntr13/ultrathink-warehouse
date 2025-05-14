import React from 'react';
import { Card } from '../ui/Card';
import { ShieldIcon, AlertTriangleIcon, LinkIcon } from 'lucide-react';
export function SecurityTips() {
  const tips = [{
    title: 'Secure Your API Keys',
    description: 'Never share your API keys publicly or commit them to version control.',
    icon: <ShieldIcon size={20} className="text-teal-500" />
  }, {
    title: 'Regular Rotation',
    description: 'Rotate your API keys periodically and immediately if compromised.',
    icon: <AlertTriangleIcon size={20} className="text-amber-500" />
  }, {
    title: 'Documentation',
    description: 'Read our security best practices in the documentation.',
    icon: <LinkIcon size={20} className="text-blue-500" />,
    link: '#'
  }];
  return <Card title="Security Tips" icon={<ShieldIcon size={18} />}>
      <div className="space-y-4">
        {tips.map((tip, index) => <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
            <div className="flex-shrink-0">{tip.icon}</div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {tip.title}
              </h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {tip.description}
              </p>
              {tip.link && <a href={tip.link} className="mt-2 text-sm text-teal-500 hover:text-teal-600 dark:hover:text-teal-400">
                  Learn more →
                </a>}
            </div>
          </div>)}
      </div>
    </Card>;
}