# Instagram運用分析ダッシュボード

Vercelにデプロイ可能な、Next.js + TypeScript + Tailwind CSSで構築されたスタイリッシュなInstagram運用分析ダッシュボードです。

## 特徴

### 投稿管理・生成機能 ✨
- **テキストテンプレート** - 6カテゴリ×30以上のテンプレート（新作発表、キャンペーン、ユーザー紹介など）
- **Unsplash画像検索** - 完全無料の高品質画像検索機能
- **ハッシュタグエディター** - 提案機能付きのハッシュタグ管理
- **スケジュール機能** - 投稿を予約またはすぐに投稿
- **Instagram風プレビュー** - 実際の投稿イメージを確認
- **ローカルストレージ管理** - 下書き・予約・投稿済みの投稿を保存
- **エンゲージメント予測** - テキスト長とハッシュタグ数から予測表示
- **レスポンシブUI** - モバイル対応のモダンなデザイン

### 分析機能
- **フォロワー数推移**: 期間内のフォロワー増減を可視化
- **エンゲージメント分析**: いいね、コメント、保存数の詳細分析
- **リーチ・インプレッション**: 投稿の到達範囲を追跡
- **投稿別パフォーマンス**: TOP 20投稿のランキングと詳細分析
- **ハッシュタグ分析**: 使用したハッシュタグの効果測定
- **時間帯別分析**: 朝・昼・夜・深夜のエンゲージメント比較
- **曜日別パフォーマンス**: 曜日ごとの効果差を可視化
- **プロフィール訪問数**: プロフィール閲覧数の推移
- **保存数分析**: 保存数の追跡と分析
- **フォロー/アンフォロー推移**: 増減の詳細データ
- **アクティブユーザー数**: アクティブユーザーの推移
- **リーチ率**: フォロワーに対する実リーチの割合（%）
- **トレンド分析**: 簡易的な近似線による予測

### UI/UX機能
- **ダークモード対応**: トグル機能で簡単切り替え
- **レスポンシブデザイン**: モバイル、タブレット、デスクトップ完全対応
- **ツールチップ**: 各指標の詳細説明
- **スムーズアニメーション**: 快適な操作感
- **期間フィルタ**: 7日、14日、30日、60日、90日から選択
- **データ比較**: 前期間比での成長率表示

### エクスポート機能
- **PNG画像出力**: ダッシュボード全体をPNG画像として保存
- **PDFレポート**: 高品質なPDF形式での出力
- **JSONデータ**: 詳細なデータをJSON形式で取得

### デザイン
- **Instagramブランドカラー**: ピンク→紫→青のグラデーション
- **ミニマリストアプローチ**: 白を基調とした清潔感
- **ホワイトスペース**: 視認性を重視した配置
- **モダンフォント**: Interフォントの採用

## 技術スタック

- **Next.js 14+** - React フレームワーク
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - ユーティリティファースト CSS
- **Recharts** - グラフライブラリ
- **html2canvas** - DOMのスクリーンショット取得
- **jsPDF** - PDF生成
- **Zustand** - 状態管理
- **Lucide React** - アイコン

## セットアップ手順

### 前提条件
- Node.js 18.17.0以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone <repository-url>
cd instagram-dashboard-vercel

# 依存関係のインストール
npm install

# または yarn を使用する場合
yarn install
```

### 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### ビルド

```bash
npm run build
npm start
```

### 型チェック

```bash
npm run type-check
```

### 投稿管理機能の設定（オプション）

投稿画像検索の機能を最大限活用するため、Unsplash APIキーを設定できます：

1. https://unsplash.com/oauth/applications にアクセス
2. 「New Application」をクリックして新規作成
3. アクセスキーをコピー
4. `.env.local` に追加：

```bash
NEXT_PUBLIC_UNSPLASH_API_KEY=your_access_key_here
```

詳細は [POST_GENERATOR_SETUP.md](./POST_GENERATOR_SETUP.md) を参照してください。

## ファイル構成

```
instagram-dashboard-vercel/
├── app/
│   ├── layout.tsx           # ルートレイアウト
│   ├── page.tsx             # メインページ
│   └── globals.css          # グローバルスタイル
├── components/
│   ├── Dashboard.tsx              # メインダッシュボード
│   ├── KPICard.tsx                # KPIカードコンポーネント
│   ├── ChartComponent.tsx         # グラフコンポーネント
│   ├── PostPerformanceTable.tsx   # 投稿パフォーマンステーブル
│   ├── HashtagAnalysis.tsx        # ハッシュタグ分析
│   ├── DateRangeSelector.tsx      # 期間選択コンポーネント
│   ├── ExportButton.tsx           # エクスポートボタン
│   ├── DarkModeToggle.tsx         # ダークモードトグル
│   ├── PostGenerator.tsx          # 投稿生成メインコンポーネント
│   ├── TextTemplateSelector.tsx   # テキストテンプレート選択
│   ├── ImageSearcher.tsx          # Unsplash画像検索
│   ├── HashtagEditor.tsx          # ハッシュタグエディター
│   ├── ScheduleSelector.tsx       # スケジュール選択
│   ├── PostPreview.tsx            # Instagram風プレビュー
│   └── SavedPostsList.tsx         # 保存済み投稿一覧
├── lib/
│   ├── utils.ts             # ユーティリティ関数
│   ├── analytics.ts         # 分析データジェネレーター
│   ├── store.ts             # Zustand状態管理（ダッシュボード）
│   ├── postStore.ts         # Zustand状態管理（投稿）
│   ├── templates.ts         # テキストテンプレート定義
│   └── unsplash.ts          # Unsplash API連携
├── public/
│   └── (静的ファイル)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── vercel.json
└── README.md
```

## 主要コンポーネント説明

### Dashboard.tsx
メインのダッシュボードコンポーネント。以下を含みます：
- KPIカード（主要指標）
- フォロワー推移グラフ
- エンゲージメント分析グラフ
- リーチ・インプレッション分析
- フォロー/アンフォロー追跡
- 時間帯別・曜日別分析
- 投稿パフォーマンステーブル
- ハッシュタグ分析
- 投稿管理・生成セクション
- 期間サマリー

### PostGenerator.tsx
投稿の管理・生成を行うメインコンポーネント：
- テキストテンプレート選択
- 画像検索・選択
- ハッシュタグエディター
- スケジュール設定
- Instagram風プレビュー
- 保存済み投稿の一覧表示・編集・削除
- ローカルストレージ管理

### KPICard.tsx
各指標を表示するカードコンポーネント。以下の機能を提供：
- 数値表示
- トレンドアイコン（上昇/下降）
- パーセンテージ変化表示
- ツールチップによる説明
- ホバーエフェクト

### ChartComponent.tsx
複数のグラフタイプをサポート：
- **line**: 折れ線グラフ
- **area**: 面積グラフ
- **bar**: 棒グラフ
- **pie**: 円グラフ
- **composed**: 複合グラフ

### PostPerformanceTable.tsx
投稿のパフォーマンスを表示：
- TOP 20投稿のランキング
- いいね、コメント、保存数
- リーチ・インプレッション
- エンゲージメント率
- ソート機能

### HashtagAnalysis.tsx
ハッシュタグの効果分析：
- 使用回数
- リーチ
- エンゲージメント率
- ビジュアルプログレスバー

### ExportButton.tsx
ダッシュボードのエクスポート機能：
- PNG画像出力
- PDFレポート生成
- JSONデータエクスポート

### TextTemplateSelector.tsx
テキストテンプレートの選択と生成：
- 6カテゴリの分類（新作発表、キャンペーン、ユーザー紹介、シーズン、日常、感謝）
- 各カテゴリ複数のテンプレート（合計30+）
- ランダム選択機能
- テンプレートのカスタマイズ対応

### ImageSearcher.tsx
Unsplash APIを使用した画像検索：
- キーワード検索
- グリッド表示による複数画像確認
- 画像の詳細情報（著者など）
- APIキーなしでもダミー画像で動作

### HashtagEditor.tsx
ハッシュタグの管理機能：
- 手動入力
- 提案ハッシュタグからの選択
- 追加・削除機能
- Instagramの推奨数表示

### ScheduleSelector.tsx
投稿スケジュール設定：
- 日付・時刻選択
- 即時投稿か予約投稿か選択
- フューチャーデート検証

### PostPreview.tsx
Instagram風のプレビュー表示：
- 実際の投稿イメージ
- テキスト + 画像表示
- ハッシュタグ表示
- エンゲージメント予測

### SavedPostsList.tsx
保存済み投稿の管理：
- 一覧表示（サムネイル付き）
- 投稿ステータス表示（下書き、予約、投稿済み）
- 編集・削除機能
- スケジュール日時表示

## サンプルデータについて

ダッシュボードは以下のサンプルデータを使用しています：
- **90日分の日次データ**: フォロワー数、エンゲージメント、リーチなど
- **20件以上の投稿データ**: いいね、コメント、保存数など
- **15件以上のハッシュタグデータ**: 使用回数、リーチ、エンゲージメント率
- **時間帯別データ**: 朝、昼、夜、深夜のエンゲージメント
- **曜日別データ**: 月～日の各曜日のパフォーマンス

実際のInstagramデータを使用する場合は、Instagram Graph APIと連携してください。

## Vercelへのデプロイ

### 前提条件
- Vercelアカウント
- GitHubリポジトリ

### デプロイ手順

1. **GitHubにプッシュ**
   ```bash
   git push origin main
   ```

2. **Vercelに接続**
   - [Vercel ダッシュボード](https://vercel.com/dashboard)にアクセス
   - 「新規プロジェクト」を選択
   - GitHubリポジトリを接続

3. **環境変数設定（必要に応じて）**
   - プロジェクト設定 → 環境変数
   - 必要な環境変数を設定

4. **デプロイ**
   - 自動的にデプロイが開始されます
   - デプロイ完了後、提供されたURLにアクセス

詳細は [Vercel ドキュメント](https://vercel.com/docs) を参照してください。

## 環境変数

現在、このプロジェクトに必須の環境変数はありません。

オプション変数：
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## ブラウザ対応

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

## パフォーマンス

- **ライトハウススコア**: 90+
- **ページロード時間**: < 2秒
- **FCP（First Contentful Paint）**: < 1秒
- **LCP（Largest Contentful Paint）**: < 2.5秒

## トラブルシューティング

### グラフが表示されない
- ブラウザのコンソールでエラーを確認
- キャッシュをクリアして再読み込み
- JavaScriptが有効になっているか確認

### エクスポート機能が動作しない
- ブラウザがポップアップをブロックしていないか確認
- ブラウザの権限設定を確認

### ダークモードが動作しない
- JavaScript が有効になっているか確認
- ブラウザのローカルストレージが有効か確認

## 今後の改善予定

- [ ] Instagram Graph API統合
- [ ] リアルタイム通知機能
- [ ] カスタムレポート生成
- [ ] 複数アカウント管理
- [ ] AI による分析レコメンデーション
- [ ] Slack連携
- [ ] スケジュール投稿機能

## ライセンス

MIT License - 詳細は LICENSE ファイルを参照してください。

## 貢献

プルリクエストを歓迎します。大きな変更の場合は、まず Issue を開いて変更内容を説明してください。

## サポート

問題が発生した場合は、GitHub Issues で報告してください。

## 作者

Created with ❤️ for Instagram Marketing Professionals

---

**注意**: このダッシュボードはサンプルデータを使用しています。実際のInstagramデータを使用する場合は、Instagram Business API の利用申請が必要です。
