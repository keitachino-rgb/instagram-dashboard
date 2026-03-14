'use client';

import React, { useRef, useMemo } from 'react';
import {
  Users,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  TrendingUp,
  Calendar,
  Zap,
  Save,
  UserPlus,
  BarChart3,
  Clock,
} from 'lucide-react';
import { useDashboardStore } from '@/lib/store';
import {
  generateAnalyticsData,
  generatePostData,
  generateHashtagData,
  generateTimeOfDayData,
  generateDayOfWeekData,
  calculateEngagementRate,
  calculateFollowerGrowth,
  type AnalyticsData,
} from '@/lib/analytics';
import { formatNumber, formatDate, formatDateTime, formatPercentage } from '@/lib/utils';
import { KPICard } from './KPICard';
import { ChartComponent } from './ChartComponent';
import { DateRangeSelector } from './DateRangeSelector';
import { ExportButton } from './ExportButton';
import { PostPerformanceTable } from './PostPerformanceTable';
import { HashtagAnalysis } from './HashtagAnalysis';

export function Dashboard() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const { dateRange } = useDashboardStore();

  // Generate data
  const analyticsData = useMemo(() => generateAnalyticsData(dateRange), [dateRange]);
  const postData = useMemo(() => generatePostData(), []);
  const hashtagData = useMemo(() => generateHashtagData(), []);
  const timeOfDayData = useMemo(() => generateTimeOfDayData(), []);
  const dayOfWeekData = useMemo(() => generateDayOfWeekData(), []);

  // Calculate metrics
  const latestData = analyticsData[analyticsData.length - 1];
  const previousData = analyticsData[Math.max(0, analyticsData.length - 8)];

  const totalFollowers = latestData.followers;
  const totalLikes = analyticsData.reduce((sum, d) => sum + d.likes, 0);
  const totalComments = analyticsData.reduce((sum, d) => sum + d.comments, 0);
  const totalSaves = analyticsData.reduce((sum, d) => sum + d.saves, 0);
  const totalReach = analyticsData.reduce((sum, d) => sum + d.reach, 0);
  const totalImpressions = analyticsData.reduce((sum, d) => sum + d.impressions, 0);
  const totalFollowsGained = analyticsData.reduce((sum, d) => sum + d.followsGained, 0);
  const totalProfileVisits = analyticsData.reduce((sum, d) => sum + d.profileVisits, 0);

  const followerGrowth = calculateFollowerGrowth(analyticsData);
  const avgEngagementRate =
    totalLikes / totalImpressions;
  const reachRate = totalReach / (totalFollowers * analyticsData.length);
  const avgLikesPerPost = totalLikes / postData.length;
  const avgCommentsPerPost = totalComments / postData.length;

  const followerChange =
    (latestData.followers - previousData.followers) / previousData.followers;
  const likeChange = (totalLikes / (analyticsData.length / 2)) / (totalLikes / (analyticsData.length / 2) + 1);
  const reachChange = (totalReach / (analyticsData.length / 2)) / (totalReach / (analyticsData.length / 2) + 1);

  // Prepare chart data
  const followerChartData = analyticsData.map((d) => ({
    date: formatDate(d.date),
    フォロワー: d.followers,
  }));

  const engagementChartData = analyticsData.map((d) => ({
    date: formatDate(d.date),
    いいね: d.likes,
    コメント: d.comments,
    保存: d.saves,
  }));

  const reachChartData = analyticsData.map((d) => ({
    date: formatDate(d.date),
    リーチ: d.reach,
    インプレッション: d.impressions,
  }));

  const followsChartData = analyticsData.map((d) => ({
    date: formatDate(d.date),
    フォロー獲得: d.followsGained,
    フォロー喪失: d.followsLost,
  }));

  const exportData = {
    generatedAt: formatDateTime(new Date()),
    period: `${dateRange}日`,
    summary: {
      totalFollowers,
      followerGrowth: `${followerGrowth.toFixed(2)}%`,
      totalLikes,
      totalComments,
      totalSaves,
      totalReach,
      totalImpressions,
      avgEngagementRate: formatPercentage(avgEngagementRate),
      reachRate: formatPercentage(reachRate),
    },
    dailyData: analyticsData,
    posts: postData,
    hashtags: hashtagData,
  };

  return (
    <div ref={dashboardRef} className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                Instagram運用分析
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                最終更新: {formatDateTime(new Date())}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ExportButton dashboardRef={dashboardRef} data={exportData} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Filters */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            期間選択
          </h2>
          <DateRangeSelector />
        </section>

        {/* KPI Cards */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            主要指標
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="フォロワー数"
              value={totalFollowers}
              metric="人"
              change={followerChange}
              changeLabel="前期間比"
              icon={<Users className="w-5 h-5" />}
              description="フォロワー総数の推移"
              trend={followerChange > 0 ? 'up' : 'down'}
            />
            <KPICard
              title="総いいね数"
              value={totalLikes}
              metric="件"
              change={likeChange}
              changeLabel="前期間比"
              icon={<Heart className="w-5 h-5" />}
              description="期間内の総いいね数"
              trend={likeChange > 0 ? 'up' : 'down'}
            />
            <KPICard
              title="総リーチ"
              value={totalReach}
              metric="人"
              change={reachChange}
              changeLabel="前期間比"
              icon={<Eye className="w-5 h-5" />}
              description="投稿を見た人数"
              trend={reachChange > 0 ? 'up' : 'down'}
            />
            <KPICard
              title="エンゲージメント率"
              value={formatPercentage(avgEngagementRate)}
              metric="率"
              icon={<Zap className="w-5 h-5" />}
              description="全インプレッションに対するアクション率"
            />
          </div>
        </section>

        {/* Secondary KPIs */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            詳細指標
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="総コメント数"
              value={totalComments}
              metric="件"
              icon={<MessageCircle className="w-5 h-5" />}
              description="受け取ったコメント総数"
            />
            <KPICard
              title="総保存数"
              value={totalSaves}
              metric="件"
              icon={<Save className="w-5 h-5" />}
              description="投稿が保存された回数"
            />
            <KPICard
              title="総インプレッション"
              value={totalImpressions}
              metric="回"
              icon={<BarChart3 className="w-5 h-5" />}
              description="投稿が表示された回数"
            />
            <KPICard
              title="プロフィール訪問数"
              value={totalProfileVisits}
              metric="人"
              icon={<TrendingUp className="w-5 h-5" />}
              description="プロフィール閲覧の総数"
            />
          </div>
        </section>

        {/* Growth Metrics */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            成長指標
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="フォロワー増加数"
              value={totalFollowsGained}
              metric="人"
              icon={<UserPlus className="w-5 h-5" />}
              description="期間内のフォロー獲得数"
              trend="up"
            />
            <KPICard
              title="平均投稿いいね数"
              value={Math.round(avgLikesPerPost)}
              metric="件/投稿"
              icon={<Heart className="w-5 h-5" />}
              description="1投稿あたりの平均いいね数"
            />
            <KPICard
              title="平均コメント数"
              value={Math.round(avgCommentsPerPost)}
              metric="件/投稿"
              icon={<MessageCircle className="w-5 h-5" />}
              description="1投稿あたりの平均コメント数"
            />
            <KPICard
              title="リーチ率"
              value={formatPercentage(reachRate)}
              metric="率"
              icon={<Eye className="w-5 h-5" />}
              description="フォロワーに対するリーチの割合"
            />
          </div>
        </section>

        {/* Charts - Row 1 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartComponent
            title="フォロワー数推移"
            data={followerChartData}
            type="area"
            dataKey="フォロワー"
            xAxisDataKey="date"
            colors={['#833AB4']}
          />
          <ChartComponent
            title="エンゲージメント分析"
            data={engagementChartData}
            type="bar"
            dataKey={['いいね', 'コメント', '保存']}
            xAxisDataKey="date"
            colors={['#E4405F', '#833AB4', '#405DE6']}
          />
        </section>

        {/* Charts - Row 2 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartComponent
            title="リーチ・インプレッション推移"
            data={reachChartData}
            type="line"
            dataKey={['リーチ', 'インプレッション']}
            xAxisDataKey="date"
            colors={['#405DE6', '#5B51D8']}
          />
          <ChartComponent
            title="フォロー/アンフォロー推移"
            data={followsChartData}
            type="bar"
            dataKey={['フォロー獲得', 'フォロー喪失']}
            xAxisDataKey="date"
            colors={['#10B981', '#EF4444']}
          />
        </section>

        {/* Time of Day Analysis */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartComponent
            title="時間帯別エンゲージメント分析"
            data={timeOfDayData}
            type="bar"
            dataKey="engagement"
            xAxisDataKey="period"
            colors={['#E4405F']}
          />
          <ChartComponent
            title="曜日別パフォーマンス"
            data={dayOfWeekData}
            type="line"
            dataKey={['engagement', 'reach']}
            xAxisDataKey="day"
            colors={['#833AB4', '#405DE6']}
          />
        </section>

        {/* Additional Analysis */}
        <section className="grid grid-cols-1 gap-6">
          <PostPerformanceTable posts={postData} />
        </section>

        <section className="grid grid-cols-1 gap-6">
          <HashtagAnalysis hashtags={hashtagData} />
        </section>

        {/* Summary Stats */}
        <section className="bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-blue rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">期間サマリー</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-white/80 text-sm mb-2">フォロワー総数</p>
              <p className="text-3xl font-bold">{formatNumber(totalFollowers)}</p>
              <p className="text-white/70 text-xs mt-1">
                {followerGrowth > 0 ? '+' : ''}{followerGrowth.toFixed(2)}% 成長
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-2">総エンゲージメント</p>
              <p className="text-3xl font-bold">
                {formatNumber(totalLikes + totalComments + totalSaves)}
              </p>
              <p className="text-white/70 text-xs mt-1">
                {formatPercentage(avgEngagementRate)} エンゲージメント率
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-2">総リーチ</p>
              <p className="text-3xl font-bold">{formatNumber(totalReach)}</p>
              <p className="text-white/70 text-xs mt-1">
                {formatNumber(Math.round(totalReach / analyticsData.length))} 平均日次
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm mb-2">投稿統計</p>
              <p className="text-3xl font-bold">{postData.length}</p>
              <p className="text-white/70 text-xs mt-1">
                {formatNumber(Math.round(totalLikes / postData.length))} 平均いいね数
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-dark-border pt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>
            Instagram運用分析ダッシュボード • 最終更新:{' '}
            {formatDateTime(new Date())}
          </p>
          <p className="mt-2 text-xs">
            このダッシュボードはサンプルデータを使用しています。
          </p>
        </footer>
      </main>
    </div>
  );
}
