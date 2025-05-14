import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { StatsCard } from '../components/reports/StatsCard';
import { DateRangePicker } from '../components/reports/DateRangePicker';
import { ReportFilters } from '../components/reports/ReportFilters';
import { ChartSection } from '../components/reports/ChartSection';
import { DataTable } from '../components/shared/DataTable';
import { BarChart2Icon, DollarSignIcon, PackageIcon, UsersIcon, ShoppingCartIcon } from 'lucide-react';
// Mock data
const salesData = [{
  name: 'Jan',
  value: 4000
}, {
  name: 'Feb',
  value: 3000
}, {
  name: 'Mar',
  value: 2000
}, {
  name: 'Apr',
  value: 2780
}, {
  name: 'May',
  value: 1890
}, {
  name: 'Jun',
  value: 2390
}];
const categoryData = [{
  name: 'Electronics',
  value: 400
}, {
  name: 'Clothing',
  value: 300
}, {
  name: 'Food',
  value: 300
}, {
  name: 'Books',
  value: 200
}];
const orderTrends = [{
  name: 'Week 1',
  value: 500
}, {
  name: 'Week 2',
  value: 350
}, {
  name: 'Week 3',
  value: 600
}, {
  name: 'Week 4',
  value: 450
}];
export function Reports() {
  const [startDate] = useState(new Date(2024, 1, 1));
  const [endDate] = useState(new Date());
  const handleExport = (format: string) => {
    // Handle export logic
    console.log(`Exporting as ${format}`);
  };
  const handleRefresh = () => {
    // Handle refresh logic
    console.log('Refreshing data');
  };
  const columns = [{
    key: 'id',
    header: 'Report ID'
  }, {
    key: 'name',
    header: 'Name'
  }, {
    key: 'date',
    header: 'Date'
  }, {
    key: 'value',
    header: 'Value'
  }];
  const reportData = [{
    id: 'RPT-001',
    name: 'Monthly Sales',
    date: '2024-02-01',
    value: '$5,234'
  }, {
    id: 'RPT-002',
    name: 'Product Analysis',
    date: '2024-02-05',
    value: '$3,123'
  }, {
    id: 'RPT-003',
    name: 'User Activity',
    date: '2024-02-10',
    value: '$7,456'
  }];
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View and analyze your business performance
        </p>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <DateRangePicker startDate={startDate} endDate={endDate} onChange={() => {}} />
        <ReportFilters onFilterChange={() => {}} onExport={handleExport} onRefresh={handleRefresh} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Sales" value="$24,567" icon={<DollarSignIcon size={20} />} change={{
        value: '+12%',
        type: 'increase'
      }} trend={{
        data: [30, 45, 32, 70, 40, 60],
        color: '#1ABC9C'
      }} />
        <StatsCard title="Total Orders" value="1,234" icon={<ShoppingCartIcon size={20} />} change={{
        value: '-3%',
        type: 'decrease'
      }} trend={{
        data: [40, 35, 45, 30, 40, 35],
        color: '#3498DB'
      }} />
        <StatsCard title="Products" value="567" icon={<PackageIcon size={20} />} change={{
        value: '+7%',
        type: 'increase'
      }} trend={{
        data: [20, 25, 30, 35, 30, 40],
        color: '#9B59B6'
      }} />
        <StatsCard title="Active Users" value="891" icon={<UsersIcon size={20} />} change={{
        value: '+24%',
        type: 'increase'
      }} trend={{
        data: [25, 30, 40, 45, 50, 60],
        color: '#E74C3C'
      }} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSection type="bar" data={salesData} title="Monthly Sales" subtitle="Revenue trends over time" />
        <ChartSection type="pie" data={categoryData} title="Sales by Category" subtitle="Distribution across product categories" />
      </div>
      <ChartSection type="line" data={orderTrends} title="Order Trends" subtitle="Weekly order volume" />
      <Card title="Recent Reports" subtitle="Latest generated reports" icon={<BarChart2Icon size={18} />}>
        <DataTable data={reportData} columns={columns} />
      </Card>
    </div>;
}