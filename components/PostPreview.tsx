'use client';

import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

interface PostPreviewProps {
  imageUrl?: string;
  text: string;
  hashtags: string[];
  scheduledAt?: Date;
}

export function PostPreview({ imageUrl, text, hashtags, scheduledAt }: PostPreviewProps) {
  const fullText = hashtags.length > 0 ? `${text}\n\n${hashtags.join(' ')}` : text;

  // 模擬エンゲージメント予測
  const textLength = text.length;
  const hashtagBonus = hashtags.length * 2;
  const imageBonus = imageUrl ? 15 : 0;
  const estimatedEngagement = Math.floor(Math.random() * 200 + 50 + hashtagBonus + imageBonus);

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-md border border-gray-200 dark:border-dark-border overflow-hidden">
      <h3 className="text-lg font-semibold p-6 pb-4 text-gray-900 dark:text-white">
        投稿プレビュー
      </h3>

      {/* スケジュール情報 */}
      {scheduledAt && (
        <div className="mx-6 mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-300">
          📅 予定日時：{scheduledAt.toLocaleString('ja-JP')}
        </div>
      )}

      {/* Instagram風プレビュー */}
      <div className="mx-6 mb-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {/* ヘッダー */}
        <div className="bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-instagram-pink to-instagram-purple"></div>
          <div>
            <p className="font-semibold text-sm text-gray-900 dark:text-white">あなたのアカウント</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">今すぐ</p>
          </div>
        </div>

        {/* 画像 */}
        {imageUrl ? (
          <div className="relative bg-gray-100 dark:bg-gray-800 aspect-square overflow-hidden">
            <img src={imageUrl} alt="投稿画像" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 aspect-square flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">画像が選択されていません</p>
          </div>
        )}

        {/* アクションボタン */}
        <div className="bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 flex gap-4">
          <button className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
            <Heart className="w-6 h-6" />
          </button>
          <button className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
            <Share2 className="w-6 h-6" />
          </button>
          <button className="ml-auto text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200">
            <Bookmark className="w-6 h-6" />
          </button>
        </div>

        {/* キャプション */}
        <div className="bg-white dark:bg-gray-900 p-4">
          <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap break-words">
            {fullText}
          </p>
        </div>

        {/* コメント表示 */}
        <div className="bg-white dark:bg-gray-900 px-4 pb-4 text-xs text-gray-500 dark:text-gray-400">
          <p>すべてのコメント（3件）を表示</p>
        </div>
      </div>

      {/* 予測情報 */}
      <div className="mx-6 mb-6 p-4 bg-gradient-to-r from-instagram-pink/10 to-instagram-purple/10 dark:from-instagram-pink/20 dark:to-instagram-purple/20 border border-instagram-pink/30 dark:border-instagram-pink/50 rounded-lg">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          📊 予測エンゲージメント
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-instagram-pink">
              {estimatedEngagement}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">推定アクション数</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-instagram-purple">
              {hashtags.length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">ハッシュタグ</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-instagram-blue">
              {textLength}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">テキスト文字数</p>
          </div>
        </div>
      </div>

      {/* テキスト情報 */}
      <div className="mx-6 mb-6 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase">
          投稿テキスト（{text.length}文字）
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words line-clamp-4">
          {text}
        </p>
      </div>
    </div>
  );
}
