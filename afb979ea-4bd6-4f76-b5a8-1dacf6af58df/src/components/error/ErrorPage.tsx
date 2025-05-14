import React from 'react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, MailIcon, ArrowLeftIcon } from 'lucide-react';
import { toast } from 'sonner';
interface ErrorPageProps {
  code: string;
  title: string;
  description: string;
  illustration: React.ReactNode;
  showBackButton?: boolean;
}
export function ErrorPage({
  code,
  title,
  description,
  illustration,
  showBackButton = true
}: ErrorPageProps) {
  const navigate = useNavigate();
  const handleContactSupport = () => {
    toast.success("Support request sent. We'll get back to you soon.");
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-lg w-full">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <span className="text-[20rem] font-bold">{code}</span>
            </div>
            <div className="relative">
              <div className="flex justify-center mb-6 text-gray-500 dark:text-gray-400 animate-bounce-subtle">
                {illustration}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {description}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => navigate('/')} icon={<HomeIcon size={16} />}>
              Back to Dashboard
            </Button>
            {showBackButton && <Button variant="outline" onClick={() => navigate(-1)} icon={<ArrowLeftIcon size={16} />}>
                Go Back
              </Button>}
            <Button variant="outline" onClick={handleContactSupport} icon={<MailIcon size={16} />}>
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>;
}