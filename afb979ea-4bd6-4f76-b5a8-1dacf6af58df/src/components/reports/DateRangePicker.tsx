import React from 'react';
import { Button } from '../ui/Button';
import { CalendarIcon } from 'lucide-react';
interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (dates: {
    start: Date;
    end: Date;
  }) => void;
  presetRanges?: {
    label: string;
    value: string;
  }[];
}
export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  presetRanges = [{
    label: 'Last 7 days',
    value: '7d'
  }, {
    label: 'Last 30 days',
    value: '30d'
  }, {
    label: 'This month',
    value: 'month'
  }, {
    label: 'Last quarter',
    value: 'quarter'
  }, {
    label: 'Year to date',
    value: 'ytd'
  }]
}: DateRangePickerProps) {
  return <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="inline-flex items-center" icon={<CalendarIcon size={16} />}>
          {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        {presetRanges.map(range => <Button key={range.value} variant="outline" size="sm">
            {range.label}
          </Button>)}
      </div>
    </div>;
}