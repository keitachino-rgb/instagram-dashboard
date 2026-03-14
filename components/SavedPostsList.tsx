'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Calendar, FileText } from 'lucide-react';
import { usePostStore, type SavedPost } from '@/lib/postStore';
import { formatDateTime } from '@/lib/utils';

interface SavedPostsListProps {
  onEditPost?: (post: SavedPost) => void;
}

export function SavedPostsList({ onEditPost }: SavedPostsListProps) {
  const { getAllPosts, deletePost, loadPosts } = usePostStore();
  const [posts, setPosts] = useState<SavedPost[]>([]);

  useEffect(() => {
    loadPosts();
    setPosts(getAllPosts());
  }, [loadPosts, getAllPosts]);

  const handleDelete = (id: string) => {
    if (window.confirm('この投稿を削除しますか？')) {
      deletePost(id);
      setPosts(getAllPosts());
    }
  };

  const getStatusLabel = (status: SavedPost['status']) => {
    switch (status) {
      case 'draft':
        return { label: '下書き', color: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300' };
      case 'scheduled':
        return { label: '予約済み', color: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' };
      case 'posted':
        return { label: '投稿済み', color: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' };
    }
  };

  if (posts.length === 0) {
    return (
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-12 border border-gray-200 dark:border-dark-border text-center">
        <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          保存済み投稿がありません
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          新しい投稿を作成して保存してください
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-card rounded-lg shadow-md border border-gray-200 dark:border-dark-border overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-dark-border">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          保存済み投稿 ({posts.length})
        </h3>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-dark-border">
        {posts.map((post) => {
          const status = getStatusLabel(post.status);
          return (
            <div key={post.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* サムネイル */}
                <div className="md:col-span-1">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt="投稿画像"
                      className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                  ) : (
                    <div className="w-full h-24 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                      <p className="text-xs text-gray-400">画像なし</p>
                    </div>
                  )}
                </div>

                {/* 情報 */}
                <div className="md:col-span-2 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">
                      {post.text}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.hashtags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-instagram-pink/20 text-instagram-pink dark:text-instagram-pink rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.hashtags.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                          +{post.hashtags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className={`px-2 py-1 rounded font-semibold ${status.color}`}>
                      {status.label}
                    </span>
                    {post.scheduledAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDateTime(post.scheduledAt)}
                      </span>
                    )}
                    <span>
                      作成：{formatDateTime(post.createdAt)}
                    </span>
                  </div>
                </div>

                {/* アクション */}
                <div className="md:col-span-1 flex flex-col gap-2 justify-center">
                  <button
                    onClick={() => onEditPost?.(post)}
                    className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    削除
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
