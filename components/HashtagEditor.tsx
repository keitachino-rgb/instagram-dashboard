'use client';

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { suggestedHashtags } from '@/lib/templates';

interface HashtagEditorProps {
  hashtags: string[];
  onChange: (hashtags: string[]) => void;
}

export function HashtagEditor({ hashtags, onChange }: HashtagEditorProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleAddHashtag = (tag: string) => {
    const cleanTag = tag.trim();
    if (!cleanTag) return;

    // # を自動で付与
    const hashTag = cleanTag.startsWith('#') ? cleanTag : `#${cleanTag}`;

    // 重複チェック
    if (!hashtags.includes(hashTag)) {
      onChange([...hashtags, hashTag]);
    }

    setInputValue('');
    setShowSuggestions(false);
  };

  const handleRemoveHashtag = (tag: string) => {
    onChange(hashtags.filter((t) => t !== tag));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddHashtag(inputValue);
    }
  };

  const filteredSuggestions = suggestedHashtags.filter((tag) =>
    tag.toLowerCase().includes(inputValue.toLowerCase()) && !hashtags.includes(tag)
  );

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        ハッシュタグエディター
      </h3>

      {/* ハッシュタグ入力 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          ハッシュタグを追加
        </label>
        <div className="relative">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSuggestions(true)}
              placeholder="#記入例"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-instagram-pink"
            />
            <button
              onClick={() => handleAddHashtag(inputValue)}
              className="px-4 py-2 bg-instagram-pink text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors duration-200 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              追加
            </button>
          </div>

          {/* 提案タグ */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
              <div className="max-h-40 overflow-y-auto p-2">
                {filteredSuggestions.slice(0, 5).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleAddHashtag(tag)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-150"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 追加済みハッシュタグ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          追加済みハッシュタグ ({hashtags.length})
        </label>
        {hashtags.length > 0 ? (
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 min-h-[40px]">
            {hashtags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-instagram-pink to-instagram-purple text-white rounded-full text-sm"
              >
                <span>{tag}</span>
                <button
                  onClick={() => handleRemoveHashtag(tag)}
                  className="hover:opacity-70 transition-opacity duration-150"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 text-center text-sm text-gray-400">
            ハッシュタグが追加されていません
          </div>
        )}
      </div>

      {/* ハッシュタグ情報 */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-300">
        <p>💡 ヒント：Instagramでは最大30個のハッシュタグが推奨されます。</p>
      </div>
    </div>
  );
}
