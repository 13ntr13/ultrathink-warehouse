import React from 'react';
import { ErrorPage } from '../components/error/ErrorPage';
import { AlertTriangleIcon } from 'lucide-react';
export function Error500() {
  return <ErrorPage code="500" title="Internal Server Error" description="Something went wrong on our end. Please try again later or contact support if the problem persists." illustration={<AlertTriangleIcon size={64} className="text-red-500" />} />;
}