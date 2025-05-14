import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
interface FAQAccordionProps {
  items: FAQItem[];
  category?: string;
}
export function FAQAccordion({
  items,
  category
}: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const toggleItem = (id: string) => {
    setOpenItems(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  };
  const filteredItems = category ? items.filter(item => item.category === category) : items;
  return <div className="space-y-2">
      {filteredItems.map(item => <div key={item.id} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button onClick={() => toggleItem(item.id)} className="flex w-full items-center justify-between px-4 py-3 text-left">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {item.question}
            </span>
            <ChevronDownIcon size={20} className={`text-gray-500 transition-transform ${openItems.includes(item.id) ? 'rotate-180' : ''}`} />
          </button>
          {openItems.includes(item.id) && <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.answer}
              </p>
            </div>}
        </div>)}
    </div>;
}