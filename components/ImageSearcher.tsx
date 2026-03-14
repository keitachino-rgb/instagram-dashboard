'use client';

import React, { useState } from 'react';
import { Search, Loader, AlertCircle } from 'lucide-react';
import { searchUnsplashImages, getDummyImages, type UnsplashImage } from '@/lib/unsplash';

interface ImageSearcherProps {
  onSelectImage: (image: UnsplashImage) => void;
  selectedImageUrl?: string;
}

export function ImageSearcher({ onSelectImage, selectedImageUrl }: ImageSearcherProps) {
  const [keyword, setKeyword] = useState<string>('');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isUsingDummy, setIsUsingDummy] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setError('キーワードを入力してください');
      return;
    }

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      // APIキーがない場合はダミーデータを使用
      const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;
      let results: UnsplashImage[];

      if (!apiKey) {
        setIsUsingDummy(true);
        results = getDummyImages(keyword);
      } else {
        setIsUsingDummy(false);
        results = await searchUnsplashImages(keyword);
      }

      if (results.length === 0) {
        setError('画像が見つかりませんでした。別のキーワードをお試しください。');
        setImages([]);
      } else {
        setImages(results);
      }
    } catch (err) {
      setError('画像の検索に失敗しました。後でお試しください。');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        画像検索（Unsplash）
      </h3>

      {/* 検索フォーム */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="例：fashion, spring, collection..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-instagram-pink"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-instagram-pink to-instagram-purple text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                検索中...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                検索
              </>
            )}
          </button>
        </div>
      </form>

      {/* エラーメッセージ */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* ダミーデータ使用時の通知 */}
      {isUsingDummy && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            サンプル画像を表示しています。Unsplash APIキーを設定して、実際の検索を有効にしてください。
          </p>
        </div>
      )}

      {/* 画像グリッド */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          {hasSearched && `${images.length}件の画像`}
        </p>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((image) => (
              <button
                key={image.id}
                onClick={() => onSelectImage(image)}
                className={`relative group rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImageUrl === image.url
                    ? 'border-instagram-pink shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 hover:border-instagram-pink'
                }`}
              >
                <img
                  src={image.thumb}
                  alt={image.description || 'Unsplash image'}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                  <p className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    選択
                  </p>
                </div>
                {selectedImageUrl === image.url && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-instagram-pink rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : hasSearched ? (
          <div className="text-center py-8 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p>検索キーワードを入力して、画像を検索してください</p>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p>検索キーワードを入力してください</p>
          </div>
        )}
      </div>

      {/* 選択画像情報 */}
      {selectedImageUrl && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-300">
            画像が選択されました ✓
          </p>
        </div>
      )}
    </div>
  );
}
