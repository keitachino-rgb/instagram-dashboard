'use client';

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  AreaChart,
} from 'recharts';

interface ChartComponentProps {
  title: string;
  data: any[];
  type: 'line' | 'bar' | 'pie' | 'area' | 'composed';
  dataKey?: string | string[];
  xAxisDataKey?: string;
  height?: number;
  colors?: string[];
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

const INSTAGRAM_COLORS = [
  '#E4405F',
  '#833AB4',
  '#405DE6',
  '#5B51D8',
  '#FD1D1D',
  '#F77737',
  '#FCAF45',
];

export function ChartComponent({
  title,
  data,
  type,
  dataKey,
  xAxisDataKey = 'date',
  height = 400,
  colors = INSTAGRAM_COLORS,
  className,
}: ChartComponentProps) {
  const chartHeight = useMemo(() => height, [height]);

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }} />
              <Legend />
              {Array.isArray(dataKey) ? (
                dataKey.map((key, idx) => (
                  <Line key={key} type="monotone" dataKey={key} stroke={colors[idx % colors.length]} strokeWidth={2} dot={false} />
                ))
              ) : dataKey ? (
                <Line type="monotone" dataKey={dataKey} stroke={colors[0]} strokeWidth={2} dot={false} />
              ) : null}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }} />
              <Legend />
              {Array.isArray(dataKey) ? (
                dataKey.map((key, idx) => <Bar key={key} dataKey={key} fill={colors[idx % colors.length]} />)
              ) : dataKey ? (
                <Bar dataKey={dataKey} fill={colors[0]} />
              ) : null}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisDataKey} />
              <YAxis />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }} />
              <Legend />
              {Array.isArray(dataKey) ? (
                dataKey.map((key, idx) => (
                  <Area key={key} type="monotone" dataKey={key} fill={colors[idx % colors.length]} stroke={colors[idx % colors.length]} fillOpacity={0.3} />
                ))
              ) : dataKey ? (
                <Area type="monotone" dataKey={dataKey} fill={colors[0]} stroke={colors[0]} fillOpacity={0.3} />
              ) : null}
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie
                data={data}
                dataKey={dataKey as string}
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {data.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className={`w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow ${className || ''}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">{title}</h3>
      {renderChart()}
    </div>
  );
}
