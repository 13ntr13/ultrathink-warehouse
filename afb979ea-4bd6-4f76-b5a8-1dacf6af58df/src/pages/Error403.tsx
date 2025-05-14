import React from 'react';
import { ErrorPage } from '../components/error/ErrorPage';
import { ShieldOffIcon } from 'lucide-react';
export function Error403() {
  return <ErrorPage code="403" title="Access Forbidden" description="Sorry, you don't have permission to access this page. Please contact your administrator if you believe this is a mistake." illustration={<ShieldOffIcon size={64} className="text-amber-500" />} />;
}