'use client';

import React, { useState, useEffect } from 'react';
import { Send, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { usePostStore, type SavedPost } from '@/lib/postStore';
import { UnsplashImage } from '@/lib/unsplash';
import { TextTemplateSelector } from './TextTemplateSelector';
import { ImageSearcher } from './ImageSearcher';
import { HashtagEditor } from './HashtagEditor';
import { PostPreview } from './PostPreview';
import { ScheduleSelector } from './ScheduleSelector';
import { SavedPostsList } from './SavedPostsList';

type Tab = 'create' | 'saved';

export function PostGenerator() {
  const { addPost, updatePost, loadPosts, getAllPosts } = usePostStore();

  // UI状態
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // フォーム状態
  const [postText, setPostText] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // 初期化
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // 通知の自動非表示
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleImageSelect = (image: UnsplashImage) => {
    setSelectedImage(image);
    setNotification({
      type: 'info',
      message: '画像が選択されました',
    });
  };

  const handleSavePost = () => {
    if (!postText.trim()) {
      setNotification({
        type: 'error',
        message: 'テキストを入力してください',
      });
      return;
    }

    const postData = {
      text: postText,
      imageUrl: selectedImage?.url || '',
      imageAuthor: selectedImage?.username,
      hashtags,
      scheduledAt: scheduledDate,
      status: scheduledDate ? ('scheduled' as const) : ('draft' as const),
    };

    if (isEditing && editingPostId) {
      updatePost(editingPostId, postData);
      setNotification({
        type: 'success',
        message: '投稿が更新されました',
      });
      resetForm();
    } else {
      addPost(postData);
      setNotification({
        type: 'success',
        message: '投稿が保存されました',
      });
      resetForm();
    }
  };

  const handlePostNow = () => {
    if (!postText.trim()) {
      setNotification({
        type: 'error',
        message: 'テキストを入力してください',
      });
      return;
    }

    const postData = {
      text: postText,
      imageUrl: selectedImage?.url || '',
      imageAuthor: selectedImage?.username,
      hashtags,
      status: 'posted' as const,
    };

    addPost(postData);
    setNotification({
      type: 'success',
      message: '投稿されました！（シミュレーション）',
    });
    resetForm();
  };

  const handleEditPost = (post: SavedPost) => {
    setPostText(post.text);
    setHashtags(post.hashtags);
    setScheduledDate(post.scheduledAt);
    if (post.imageUrl) {
      setSelectedImage({
        id: 'edited',
        url: post.imageUrl,
        thumb: post.imageUrl,
        description: 'Edited image',
        username: post.imageAuthor || 'Unknown',
        links: { html: '' },
      });
    }
    setEditingPostId(post.id);
    setIsEditing(true);
    setActiveTab('create');
  };

  const resetForm = () => {
    setPostText('');
    setSelectedImage(null);
    setHashtags([]);
    setScheduledDate(undefined);
    setIsEditing(false);
    setEditingPostId(null);
  };

  return (
    <div className="space-y-6">
      {/* 通知 */}
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-in fade-in slide-in-from-top ${
            notification.type === 'success'
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
              : notification.type === 'error'
              ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
              : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}

      {/* タブ */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-dark-border">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-3 font-semibold border-b-2 transition-colors duration-200 ${
            activeTab === 'create'
              ? 'border-instagram-pink text-instagram-pink'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
          }`}
        >
          新規投稿作成
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-3 font-semibold border-b-2 transition-colors duration-200 ${
            activeTab === 'saved'
              ? 'border-instagram-pink text-instagram-pink'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
          }`}
        >
          保存済み投稿
        </button>
      </div>

      {/* コンテンツ */}
      {activeTab === 'create' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左：フォーム */}
          <div className="lg:col-span-2 space-y-6">
            {/* ヘッダー */}
            {isEditing && (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center justify-between">
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  投稿を編集中です
                </p>
                <button
                  onClick={resetForm}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  キャンセル
                </button>
              </div>
            )}

            {/* テキスト入力 */}
            <div className="bg-white dark:bg-dark-card rounded-lg shadow-md p-6 border border-gray-200 dark:border-dark-border">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                投稿テキスト
              </label>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="投稿内容を入力または、テンプレートから選択してください..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-instagram-pink h-40 resize-none"
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {postText.length}文字
              </p>
            </div>

            {/* テンプレート選択 */}
            <TextTemplateSelector onSelect={setPostText} />

            {/* 画像検索 */}
            <ImageSearcher
              onSelectImage={handleImageSelect}
              selectedImageUrl={selectedImage?.url}
            />

            {/* ハッシュタグエディター */}
            <HashtagEditor hashtags={hashtags} onChange={setHashtags} />

            {/* スケジュール選択 */}
            <ScheduleSelector onScheduleChange={setScheduledDate} selectedDate={scheduledDate} />

            {/* アクションボタン */}
            <div className="flex gap-3">
              <button
                onClick={handleSavePost}
                className="flex-1 py-3 px-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {isEditing ? '更新' : '保存'}
              </button>
              <button
                onClick={handlePostNow}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-blue text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                今すぐ投稿
              </button>
            </div>
          </div>

          {/* 右：プレビュー */}
          <div className="lg:col-span-1">
            <PostPreview
              imageUrl={selectedImage?.url}
              text={postText}
              hashtags={hashtags}
              scheduledAt={scheduledDate}
            />
          </div>
        </div>
      ) : (
        <SavedPostsList onEditPost={handleEditPost} />
      )}
    </div>
  );
}
