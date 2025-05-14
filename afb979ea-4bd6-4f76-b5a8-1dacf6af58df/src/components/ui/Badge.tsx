import React from 'react';
type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}
export function Badge({
  variant = 'primary',
  children,
  className = ''
}: BadgeProps) {
  const variantStyles = {
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    info: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300'
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>;
}