'use client';

import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { getTemplatesByCategory, getAllCategories, getRandomTemplate } from '@/lib/templates';

interface TextTemplateSelectorProps {
  onSelect: (text: string) => void;
  onCategoryChange?: (category: string) => void;
}

export function TextTemplateSelector({
  onSelect,
  onCategoryChange,
}: TextTemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('新作発表');
  const categories = getAllCategories();
  const templates = getTemplatesByCategory(selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  const handleRandomSelect = () => {
    const template = getRandomTemplate(selectedCategory);
    onSelect(template.text);
  };

  const handleTemplateSelect = (text: string) => {
    onSelect(text);
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        テキストテンプレート選択
      </h3>

      {/* カテゴリ選択 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          カテゴリを選択
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-instagram-pink to-instagram-purple text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* テンプレートリスト */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          テンプレートを選択または作成
        </label>
        <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 dark:border-dark-border rounded-lg p-3 bg-gray-50 dark:bg-gray-900">
          {templates.length > 0 ? (
            templates.map((template, index) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template.text)}
                className="w-full text-left p-3 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border hover:border-instagram-pink dark:hover:border-instagram-pink transition-colors duration-200 group"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 group-hover:text-gray-900 dark:group-hover:text-gray-200">
                  {template.text.split('\n')[0]}...
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  テンプレート {index + 1}
                </p>
              </button>
            ))
          ) : (
            <div className="text-center py-4 text-gray-400">
              テンプレートがありません
            </div>
          )}
        </div>
      </div>

      {/* ランダム選択ボタン */}
      <button
        onClick={handleRandomSelect}
        className="w-full py-2 px-4 bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Zap className="w-4 h-4" />
        ランダム選択
      </button>
    </div>
  );
}
