import { create } from 'zustand';

export type PostStatus = 'draft' | 'scheduled' | 'posted';

export interface SavedPost {
  id: string;
  text: string;
  imageUrl: string;
  imageAuthor?: string;
  hashtags: string[];
  scheduledAt?: Date;
  createdAt: Date;
  status: PostStatus;
}

interface PostStore {
  // 投稿管理
  posts: SavedPost[];
  addPost: (post: Omit<SavedPost, 'id' | 'createdAt'>) => void;
  updatePost: (id: string, post: Partial<SavedPost>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => SavedPost | undefined;
  getAllPosts: () => SavedPost[];

  // ローカルストレージへのロード/セーブ
  loadPosts: () => void;
  savePosts: () => void;
}

const STORAGE_KEY = 'instagram-dashboard-posts';

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],

  addPost: (post) =>
    set((state) => {
      const newPost: SavedPost = {
        ...post,
        id: `post-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        createdAt: new Date(),
      };
      const updatedPosts = [...state.posts, newPost];
      // 自動でローカルストレージに保存
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
      return { posts: updatedPosts };
    }),

  updatePost: (id, updates) =>
    set((state) => {
      const updatedPosts = state.posts.map((post) =>
        post.id === id ? { ...post, ...updates } : post
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
      return { posts: updatedPosts };
    }),

  deletePost: (id) =>
    set((state) => {
      const updatedPosts = state.posts.filter((post) => post.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
      return { posts: updatedPosts };
    }),

  getPost: (id) => get().posts.find((post) => post.id === id),

  getAllPosts: () => get().posts,

  loadPosts: () => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const posts = JSON.parse(stored).map((post: SavedPost) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          scheduledAt: post.scheduledAt ? new Date(post.scheduledAt) : undefined,
        }));
        set({ posts });
      }
    } catch (error) {
      console.error('Failed to load posts from localStorage:', error);
    }
  },

  savePosts: () => {
    if (typeof window === 'undefined') return;
    try {
      const posts = get().posts;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
      console.error('Failed to save posts to localStorage:', error);
    }
  },
}));
