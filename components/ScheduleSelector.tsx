'use client';

import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface ScheduleSelectorProps {
  onScheduleChange: (date: Date | undefined) => void;
  selectedDate?: Date;
}

export function ScheduleSelector({ onScheduleChange, selectedDate }: ScheduleSelectorProps) {
  const [scheduleEnabled, setScheduleEnabled] = useState<boolean>(!!selectedDate);
  const [date, setDate] = useState<string>(
    selectedDate ? selectedDate.toISOString().split('T')[0] : ''
  );
  const [time, setTime] = useState<string>(
    selectedDate ? selectedDate.toTimeString().slice(0, 5) : '12:00'
  );

  // 今日の日付を取得
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    if (scheduleEnabled && newDate && time) {
      const dateTime = new Date(`${newDate}T${time}`);
      onScheduleChange(dateTime);
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    if (scheduleEnabled && date && newTime) {
      const dateTime = new Date(`${date}T${newTime}`);
      onScheduleChange(dateTime);
    }
  };

  const handleScheduleToggle = (enabled: boolean) => {
    setScheduleEnabled(enabled);
    if (!enabled) {
      onScheduleChange(undefined);
    } else if (date && time) {
      const dateTime = new Date(`${date}T${time}`);
      onScheduleChange(dateTime);
    }
  };

  const isFutureDate = date && new Date(`${date}T${time}`) > today;

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        投稿スケジュール
      </h3>

      {/* スケジュール有効化 */}
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={scheduleEnabled}
            onChange={(e) => handleScheduleToggle(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-instagram-pink focus:ring-instagram-pink"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            投稿をスケジュール設定する
          </span>
        </label>
      </div>

      {scheduleEnabled && (
        <>
          {/* 日付選択 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              投稿日付
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
                min={minDate}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-instagram-pink"
              />
            </div>
          </div>

          {/* 時刻選択 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              投稿時刻
            </label>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <input
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-instagram-pink"
              />
            </div>
          </div>

          {/* スケジュール情報 */}
          {date && time ? (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">
                ✓ 予定日時が設定されました
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                {new Date(`${date}T${time}`).toLocaleString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                日付と時刻を選択してください
              </p>
            </div>
          )}
        </>
      )}

      {/* 即時投稿情報 */}
      {!scheduleEnabled && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            💡 スケジュール設定なしで「投稿」ボタンを押すと、すぐに投稿されます（シミュレーション）
          </p>
        </div>
      )}
    </div>
  );
}
