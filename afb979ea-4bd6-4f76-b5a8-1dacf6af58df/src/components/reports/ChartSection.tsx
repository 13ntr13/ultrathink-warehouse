import React from 'react';
import { Card } from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
interface ChartSectionProps {
  type: 'bar' | 'line' | 'pie';
  data: any[];
  title: string;
  subtitle?: string;
  height?: number;
}
const COLORS = ['#1ABC9C', '#3498DB', '#9B59B6', '#E74C3C', '#F1C40F'];
export function ChartSection({
  type,
  data,
  title,
  subtitle,
  height = 300
}: ChartSectionProps) {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1ABC9C" />
            </BarChart>
          </ResponsiveContainer>;
      case 'line':
        return <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#1ABC9C" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>;
      case 'pie':
        return <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#1ABC9C" label>
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>;
      default:
        return null;
    }
  };
  return <Card title={title} subtitle={subtitle} className="relative">
      {renderChart()}
    </Card>;
}