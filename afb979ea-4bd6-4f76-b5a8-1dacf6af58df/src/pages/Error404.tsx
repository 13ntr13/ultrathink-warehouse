import React from 'react';
import { ErrorPage } from '../components/error/ErrorPage';
import { SearchXIcon } from 'lucide-react';
export function Error404() {
  return <ErrorPage code="404" title="Page Not Found" description="Oops! The page you're looking for doesn't exist. Please check the URL and try again." illustration={<SearchXIcon size={64} className="text-teal-500" />} />;
}