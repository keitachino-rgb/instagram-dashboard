'use client';

import React, { useState } from 'react';
import { formatNumber, formatPercentage } from '@/lib/utils';
import type { PostData } from '@/lib/analytics';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface PostPerformanceTableProps {
  posts: PostData[];
}

type SortKey = keyof PostData;

export function PostPerformanceTable({ posts }: PostPerformanceTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('likes');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedPosts = [...posts].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <span className="text-gray-300">⇅</span>;
    return sortOrder === 'desc' ? (
      <ChevronDown className="w-4 h-4" />
    ) : (
      <ChevronUp className="w-4 h-4" />
    );
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-200 dark:border-dark-border overflow-x-auto">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        投稿パフォーマンス TOP 20
      </h3>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-dark-border">
            <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
              投稿
            </th>
            <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-instagram-pink transition-colors"
              onClick={() => toggleSort('likes')}
            >
              <div className="flex items-center justify-end gap-1">
                いいね
                <SortIcon column="likes" />
              </div>
            </th>
            <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-instagram-pink transition-colors"
              onClick={() => toggleSort('comments')}
            >
              <div className="flex items-center justify-end gap-1">
                コメント
                <SortIcon column="comments" />
              </div>
            </th>
            <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-instagram-pink transition-colors"
              onClick={() => toggleSort('saves')}
            >
              <div className="flex items-center justify-end gap-1">
                保存
                <SortIcon column="saves" />
              </div>
            </th>
            <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-instagram-pink transition-colors"
              onClick={() => toggleSort('reach')}
            >
              <div className="flex items-center justify-end gap-1">
                リーチ
                <SortIcon column="reach" />
              </div>
            </th>
            <th className="text-right py-3 px-4 font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-instagram-pink transition-colors"
              onClick={() => toggleSort('engagementRate')}
            >
              <div className="flex items-center justify-end gap-1">
                エンゲージメント率
                <SortIcon column="engagementRate" />
              </div>
            </th>
            <th className="text-center py-3 px-4 font-semibold text-gray-900 dark:text-white">
              タイプ
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPosts.map((post, idx) => (
            <tr
              key={post.id}
              className="border-b border-gray-100 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-border transition-colors"
            >
              <td className="py-4 px-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-instagram-gradient flex items-center justify-center text-white text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {post.caption}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {post.date.toLocaleDateString('ja-JP')}
                    </p>
                  </div>
                </div>
              </td>
              <td className="text-right py-4 px-4 text-gray-900 dark:text-white font-semibold">
                {formatNumber(post.likes)}
              </td>
              <td className="text-right py-4 px-4 text-gray-900 dark:text-white font-semibold">
                {formatNumber(post.comments)}
              </td>
              <td className="text-right py-4 px-4 text-gray-900 dark:text-white font-semibold">
                {formatNumber(post.saves)}
              </td>
              <td className="text-right py-4 px-4 text-gray-900 dark:text-white font-semibold">
                {formatNumber(post.reach)}
              </td>
              <td className="text-right py-4 px-4 text-gray-900 dark:text-white font-semibold">
                {formatPercentage(post.engagementRate)}
              </td>
              <td className="text-center py-4 px-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-blue text-white">
                  {post.type === 'reel' ? 'リール' : post.type === 'story' ? 'ストーリー' : '投稿'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
