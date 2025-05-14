import React, { useState } from 'react';
import { toast } from 'sonner';
import { SearchBar } from '../components/help/SearchBar';
import { FAQAccordion } from '../components/help/FAQAccordion';
import { ResourceCard } from '../components/help/ResourceCard';
import { StatusBanner } from '../components/help/StatusBanner';
import { SupportContact } from '../components/help/SupportContact';
import { TicketForm } from '../components/help/TicketForm';
import { BookOpenIcon, PlayCircleIcon, FileTextIcon, GraduationCapIcon } from 'lucide-react';
// Mock data
const faqItems = [{
  id: '1',
  question: 'How do I reset my password?',
  answer: "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password.",
  category: 'account'
}, {
  id: '2',
  question: 'How can I track inventory changes?',
  answer: 'You can view inventory changes in the Reports section. Use the date filters to see specific periods and export the data as needed.',
  category: 'inventory'
}, {
  id: '3',
  question: 'What are the system requirements?',
  answer: "Our system works best with modern browsers like Chrome, Firefox, Safari, or Edge. Make sure you're using the latest version for optimal performance.",
  category: 'technical'
}
// Add more FAQ items as needed
];
const resources = [{
  title: 'Documentation',
  description: 'Detailed guides and reference materials for all features',
  icon: <BookOpenIcon size={24} />,
  link: '#',
  linkText: 'View Documentation'
}, {
  title: 'Video Tutorials',
  description: 'Step-by-step video guides for common tasks',
  icon: <PlayCircleIcon size={24} />,
  link: '#',
  linkText: 'Watch Tutorials'
}, {
  title: 'API Reference',
  description: 'Complete API documentation for developers',
  icon: <FileTextIcon size={24} />,
  link: '#',
  linkText: 'View API Docs'
}, {
  title: 'Knowledge Base',
  description: 'Articles and guides for advanced topics',
  icon: <GraduationCapIcon size={24} />,
  link: '#',
  linkText: 'Browse Articles'
}];
export function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleTicketSubmit = (data: any) => {
    console.log('Ticket submitted:', data);
    toast.success('Support ticket submitted successfully');
  };
  const filteredFAQs = faqItems.filter(item => item.question.toLowerCase().includes(searchQuery.toLowerCase()) || item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Find answers, documentation, and support options
        </p>
      </div>
      <StatusBanner status="operational" message="All services are running normally" lastUpdated="5 minutes ago" />
      <div className="max-w-2xl">
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search FAQs and help articles..." />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource, index) => <ResourceCard key={index} {...resource} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">
                Frequently Asked Questions
              </h2>
              <FAQAccordion items={filteredFAQs} />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <SupportContact onStartChat={() => toast.success('Starting chat...')} onCallSupport={() => toast.success('Initiating call...')} onEmailSupport={() => toast.success('Opening email client...')} />
          <TicketForm onSubmit={handleTicketSubmit} />
        </div>
      </div>
    </div>;
}