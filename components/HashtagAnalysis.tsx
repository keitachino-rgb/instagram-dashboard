'use client';

import React from 'react';
import { formatNumber, formatPercentage } from '@/lib/utils';
import type { HashtagData } from '@/lib/analytics';

interface HashtagAnalysisProps {
  hashtags: HashtagData[];
}

export function HashtagAnalysis({ hashtags }: HashtagAnalysisProps) {
  const sorted = [...hashtags].sort((a, b) => b.reach - a.reach);
  const maxReach = Math.max(...sorted.map((h) => h.reach));

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        ハッシュタグ分析
      </h3>

      <div className="space-y-4">
        {sorted.map((hashtag, idx) => (
          <div key={hashtag.tag} className="group">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {hashtag.tag}
                  </span>
                  <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-400">
                    #{idx + 1}
                  </span>
                </div>
                <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
                  <span>使用: {formatNumber(hashtag.uses)}</span>
                  <span>リーチ: {formatNumber(hashtag.reach)}</span>
                  <span>エンゲージメント: {formatPercentage(hashtag.engagementRate)}</span>
                </div>
              </div>
            </div>

            {/* Progress bar for reach */}
            <div className="w-full h-2 bg-gray-100 dark:bg-dark-border rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-blue transition-all duration-500"
                style={{ width: `${(hashtag.reach / maxReach) * 100}%` }}
              />
            </div>

            {/* Engagement rate indicator */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">エンゲージメント:</span>
              <div className="flex-1 h-1.5 bg-gray-100 dark:bg-dark-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600"
                  style={{ width: `${Math.min(hashtag.engagementRate * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold gradient-text mb-1">
            {formatNumber(sorted.reduce((sum, h) => sum + h.uses, 0))}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">総使用数</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold gradient-text mb-1">
            {formatNumber(sorted.reduce((sum, h) => sum + h.reach, 0))}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">総リーチ</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold gradient-text mb-1">
            {formatPercentage(
              sorted.reduce((sum, h) => sum + h.engagementRate, 0) / sorted.length
            )}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">平均エンゲージメント</p>
        </div>
      </div>
    </div>
  );
}
