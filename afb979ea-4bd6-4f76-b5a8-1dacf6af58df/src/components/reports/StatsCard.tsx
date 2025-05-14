import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string;
    type: 'increase' | 'decrease';
  };
  trend?: {
    data: number[];
    color: string;
  };
}
export function StatsCard({
  title,
  value,
  icon,
  change,
  trend
}: StatsCardProps) {
  const renderSparkline = () => {
    if (!trend?.data) return null;
    const max = Math.max(...trend.data);
    const min = Math.min(...trend.data);
    const range = max - min;
    const points = trend.data.map((value, index) => {
      const x = index / (trend.data.length - 1) * 64;
      const y = 32 - (value - min) / range * 24;
      return `${x},${y}`;
    }).join(' ');
    return <svg className="w-16 h-8" viewBox="0 0 64 32">
        <polyline points={points} fill="none" stroke={trend.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>;
  };
  return <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-semibold">{value}</p>
        </div>
        <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-full text-teal-500">
          {icon}
        </div>
      </div>
      {(change || trend) && <div className="mt-4 flex items-center justify-between">
          {change && <div className="flex items-center">
              <span className={`flex items-center text-sm font-medium ${change.type === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {change.type === 'increase' ? <TrendingUpIcon size={16} className="mr-1" /> : <TrendingDownIcon size={16} className="mr-1" />}
                {change.value}
              </span>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                vs last month
              </span>
            </div>}
          {trend && <div className="flex-shrink-0">{renderSparkline()}</div>}
        </div>}
    </Card>;
}