import React from 'react';
interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}
export function Card({
  title,
  subtitle,
  icon,
  children,
  className = '',
  footer
}: CardProps) {
  return <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`}>
      {(title || subtitle || icon) && <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            {icon && <div className="mr-3 text-teal-500">{icon}</div>}
            <div>
              {title && <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {title}
                </h3>}
              {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {subtitle}
                </p>}
            </div>
          </div>
        </div>}
      <div className="px-6 py-4">{children}</div>
      {footer && <div className="px-6 py-3 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>}
    </div>;
}