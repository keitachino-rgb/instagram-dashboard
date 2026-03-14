'use client';

import React from 'react';
import { useDashboardStore, type DateRange } from '@/lib/store';
import { cn } from '@/lib/utils';

const DATE_RANGES: { label: string; value: DateRange }[] = [
  { label: '7日', value: 7 },
  { label: '14日', value: 14 },
  { label: '30日', value: 30 },
  { label: '60日', value: 60 },
  { label: '90日', value: 90 },
];

export function DateRangeSelector() {
  const { dateRange, setDateRange } = useDashboardStore();

  return (
    <div className="flex gap-2 flex-wrap">
      {DATE_RANGES.map((range) => (
        <button
          key={range.value}
          onClick={() => setDateRange(range.value)}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-smooth text-sm',
            dateRange === range.value
              ? 'bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-blue text-white shadow-lg'
              : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:bg-gray-200 dark:hover:bg-dark-border'
          )}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}
