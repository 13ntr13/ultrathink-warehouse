import React from 'react';
import { Card } from '../ui/Card';
import { UserIcon, PhoneIcon, AtSignIcon, BuildingIcon } from 'lucide-react';
interface PersonalInfoSectionProps {
  info: {
    name: string;
    email: string;
    phone: string;
    company: string;
    department?: string;
    location?: string;
  };
}
export function PersonalInfoSection({
  info
}: PersonalInfoSectionProps) {
  const details = [{
    icon: <UserIcon size={16} />,
    label: 'Full Name',
    value: info.name
  }, {
    icon: <AtSignIcon size={16} />,
    label: 'Email',
    value: info.email
  }, {
    icon: <PhoneIcon size={16} />,
    label: 'Phone',
    value: info.phone
  }, {
    icon: <BuildingIcon size={16} />,
    label: 'Company',
    value: info.company
  }];
  if (info.department) {
    details.push({
      icon: <BuildingIcon size={16} />,
      label: 'Department',
      value: info.department
    });
  }
  if (info.location) {
    details.push({
      icon: <BuildingIcon size={16} />,
      label: 'Location',
      value: info.location
    });
  }
  return <Card title="Personal Information" icon={<UserIcon size={18} />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {details.map((detail, index) => <div key={index} className="space-y-1">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              {detail.icon}
              <span>{detail.label}</span>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {detail.value}
            </p>
          </div>)}
      </div>
    </Card>;
}