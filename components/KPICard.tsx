'use client';

import React from 'react';
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import { formatNumber, formatPercentage } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: number | string;
  metric?: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function KPICard({
  title,
  value,
  metric,
  change,
  changeLabel,
  icon,
  description,
  trend = 'neutral',
}: KPICardProps) {
  const isPositive = trend === 'up' || (change && change > 0);
  const isNegative = trend === 'down' || (change && change < 0);

  return (
    <div className="group relative bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border transition-smooth hover:shadow-lg dark:hover:shadow-2xl">
      {/* Header with title and icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          {description && (
            <div className="tooltip inline-block">
              <HelpCircle className="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-help" />
              <span className="tooltiptext">{description}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="text-gray-400 dark:text-gray-500 group-hover:text-instagram-pink transition-colors">
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-4">
        <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
          {typeof value === 'number' ? formatNumber(value) : value}
        </div>
        {metric && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{metric}</p>
        )}
      </div>

      {/* Change indicator */}
      {change !== undefined && (
        <div
          className={cn(
            'flex items-center gap-2 text-sm font-semibold',
            isPositive && 'text-green-600 dark:text-green-400',
            isNegative && 'text-red-600 dark:text-red-400',
            !isPositive && !isNegative && 'text-gray-600 dark:text-gray-400'
          )}
        >
          {isPositive && <TrendingUp className="w-4 h-4" />}
          {isNegative && <TrendingDown className="w-4 h-4" />}
          <span>{formatPercentage(Math.abs(change))}</span>
          {changeLabel && (
            <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
              {changeLabel}
            </span>
          )}
        </div>
      )}

      {/* Background gradient accent */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br from-instagram-pink via-instagram-purple to-instagram-blue rounded-2xl pointer-events-none" />
    </div>
  );
}
