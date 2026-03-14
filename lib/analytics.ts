export interface AnalyticsData {
  id: string;
  date: Date;
  followers: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  reach: number;
  impressions: number;
  profileVisits: number;
  followsGained: number;
  followsLost: number;
  activeUsers: number;
}

export interface PostData {
  id: string;
  date: Date;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  reach: number;
  impressions: number;
  engagementRate: number;
  type: 'post' | 'reel' | 'story';
}

export interface HashtagData {
  tag: string;
  uses: number;
  reach: number;
  impressions: number;
  engagementRate: number;
}

export interface TimeOfDayData {
  period: string;
  engagement: number;
  reach: number;
  likes: number;
  comments: number;
}

export interface DayOfWeekData {
  day: string;
  engagement: number;
  reach: number;
  followers: number;
}

// サンプルデータジェネレーター
export function generateAnalyticsData(days: number = 90): AnalyticsData[] {
  const data: AnalyticsData[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // ベースメトリクス + ランダムノイズ
    const baseFollowers = 15000 + i * 50;
    const followers = baseFollowers + Math.floor(Math.random() * 500) - 250;

    const baseLikes = 850;
    const likes = baseLikes + Math.floor(Math.random() * 400) - 200;

    const comments = Math.floor(Math.random() * 120) + 20;
    const shares = Math.floor(Math.random() * 30) + 5;
    const saves = Math.floor(Math.random() * 80) + 10;

    const reach = likes * (8 + Math.random() * 4);
    const impressions = reach * (1.2 + Math.random() * 0.5);

    const profileVisits = Math.floor(impressions * (0.02 + Math.random() * 0.03));
    const followsGained = Math.floor(Math.random() * 80) + 10;
    const followsLost = Math.floor(Math.random() * 20) + 2;
    const activeUsers = Math.floor(reach * (0.15 + Math.random() * 0.1));

    data.push({
      id: `data-${i}`,
      date,
      followers,
      likes: Math.floor(likes),
      comments,
      shares,
      saves,
      reach: Math.floor(reach),
      impressions: Math.floor(impressions),
      profileVisits,
      followsGained,
      followsLost,
      activeUsers,
    });
  }

  return data;
}

export function generatePostData(): PostData[] {
  const captions = [
    '新商品のご紹介 🌟',
    'フォロワーの皆さんへの感謝企画 💝',
    '週末のおすすめスポット 📸',
    '季節の変わり目、新しい始まり 🌸',
    'リーダー投票結果発表！ 🎉',
    '限定セール開始です 🔥',
    'スタッフおすすめ商品3選 ⭐',
    'イベント参加レポート 📝',
    '素敵なフォロワーさんの投稿をシェア 📢',
    'メイクチュートリアル 💄',
    'トレンドファッションコーディネート 👗',
    '健康的なレシピ提案 🍽️',
    'バックステージ映像公開 🎬',
    '質問箱の回答！ ❓',
    'スペシャルゲスト登場 🌟',
    'DIYプロジェクト 🛠️',
    'ビフォー・アフター変身 ✨',
    'オフィスツアー 🏢',
    'スポーツ活動報告 ⚽',
    'アート制作過程 🎨',
  ];

  const types: Array<'post' | 'reel' | 'story'> = ['post', 'reel', 'story'];
  const posts: PostData[] = [];

  for (let i = 0; i < 20; i++) {
    const likes = Math.floor(Math.random() * 3000) + 500;
    const comments = Math.floor(Math.random() * 200) + 20;
    const shares = Math.floor(Math.random() * 100) + 5;
    const saves = Math.floor(Math.random() * 300) + 30;
    const reach = likes * (5 + Math.random() * 8);
    const impressions = reach * (1.1 + Math.random() * 0.5);
    const engagementRate = (likes + comments + shares + saves) / impressions;

    const date = new Date();
    date.setDate(date.getDate() - i);

    posts.push({
      id: `post-${i}`,
      date,
      caption: captions[i] || `投稿 #${i + 1}`,
      likes,
      comments,
      shares,
      saves,
      reach: Math.floor(reach),
      impressions: Math.floor(impressions),
      engagementRate,
      type: types[i % types.length],
    });
  }

  return posts.sort((a, b) => b.likes - a.likes);
}

export function generateHashtagData(): HashtagData[] {
  const hashtags = [
    'トレンド',
    'ライフスタイル',
    'ファッション',
    '新商品',
    'プレゼント',
    '限定セール',
    'スポーツ',
    'グルメ',
    'トラベル',
    'インスタグラム',
    'おしゃれさんと繋がりたい',
    'いいね返し',
    'フォロー返し',
    'デイリー',
    'シーズン',
  ];

  return hashtags.map((tag) => ({
    tag: `#${tag}`,
    uses: Math.floor(Math.random() * 100) + 10,
    reach: Math.floor(Math.random() * 50000) + 5000,
    impressions: Math.floor(Math.random() * 80000) + 10000,
    engagementRate: Math.random() * 0.08 + 0.02,
  }));
}

export function generateTimeOfDayData(): TimeOfDayData[] {
  return [
    {
      period: '朝（5-12時）',
      engagement: 1200,
      reach: 8500,
      likes: 650,
      comments: 120,
    },
    {
      period: '昼（12-17時）',
      engagement: 2100,
      reach: 14200,
      likes: 1200,
      comments: 220,
    },
    {
      period: '夜（17-21時）',
      engagement: 3400,
      reach: 21500,
      likes: 1950,
      comments: 380,
    },
    {
      period: '深夜（21-5時）',
      engagement: 1800,
      reach: 12000,
      likes: 900,
      comments: 200,
    },
  ];
}

export function generateDayOfWeekData(): DayOfWeekData[] {
  return [
    { day: '月', engagement: 2800, reach: 18900, followers: 15050 },
    { day: '火', engagement: 3200, reach: 21500, followers: 15120 },
    { day: '水', engagement: 2900, reach: 19800, followers: 15180 },
    { day: '木', engagement: 3600, reach: 24200, followers: 15240 },
    { day: '金', engagement: 4200, reach: 28500, followers: 15310 },
    { day: '土', engagement: 5100, reach: 34500, followers: 15380 },
    { day: '日', engagement: 4800, reach: 32000, followers: 15420 },
  ];
}

export function calculateEngagementRate(
  likes: number,
  comments: number,
  shares: number,
  saves: number,
  reach: number
): number {
  return reach > 0 ? (likes + comments + shares + saves) / reach : 0;
}

export function calculateFollowerGrowth(data: AnalyticsData[]): number {
  if (data.length < 2) return 0;
  const first = data[0].followers;
  const last = data[data.length - 1].followers;
  return ((last - first) / first) * 100;
}

export function getTopPost(posts: PostData[]): PostData | null {
  return posts.length > 0 ? posts[0] : null;
}

export function getAverageEngagementRate(posts: PostData[]): number {
  if (posts.length === 0) return 0;
  const total = posts.reduce((sum, post) => sum + post.engagementRate, 0);
  return total / posts.length;
}
