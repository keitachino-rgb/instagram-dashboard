# セットアップガイド

このガイドに従って、Instagram運用分析ダッシュボードをセットアップしてください。

## 前提条件

以下がインストールされていることを確認してください：

- **Node.js**: 18.17.0以上
- **npm**: 9.0.0以上（または yarn 3.0.0以上）
- **Git**: バージョン管理用

## インストール手順

### ステップ 1: プロジェクトの取得

```bash
# リポジトリのクローン
git clone https://github.com/your-username/instagram-dashboard-vercel.git
cd instagram-dashboard-vercel

# または、ZIPファイルをダウンロードして展開
# unzip instagram-dashboard-vercel.zip
# cd instagram-dashboard-vercel
```

### ステップ 2: 依存関係のインストール

```bash
npm install
```

このコマンドで以下がインストールされます：
- `next`: Next.js フレームワーク
- `react` & `react-dom`: React ライブラリ
- `recharts`: グラフコンポーネント
- `html2canvas` & `jspdf`: エクスポート機能
- `tailwindcss`: スタイリング
- その他のユーティリティ

### ステップ 3: 開発環境の起動

```bash
npm run dev
```

出力例：
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 1234ms
```

ブラウザで http://localhost:3000 を開いてください。

## 動作確認チェックリスト

ダッシュボードが正しく表示されたか確認します：

- [ ] ダッシュボードが読み込まれている
- [ ] KPIカードが表示されている
- [ ] グラフが正しく描画されている
- [ ] ダークモードトグルが動作している
- [ ] 期間選択ボタンが動作している
- [ ] エクスポートボタンが表示されている
- [ ] レスポンシブデザインが機能している（ブラウザをリサイズ）

## よくあるエラーと対処法

### エラー: "Command not found: npm"

**原因**: Node.js/npm がインストールされていない

**解決**:
```bash
# Node.js をインストール（macOS の場合）
brew install node

# バージョン確認
node --version
npm --version
```

### エラー: "Port 3000 is already in use"

**原因**: ポート 3000 が他のプロセスで使用されている

**解決**:
```bash
# 別のポートで起動
npm run dev -- -p 3001

# または、ポート 3000 のプロセスを終了
lsof -ti:3000 | xargs kill -9
```

### エラー: "Cannot find module..."

**原因**: 依存関係がインストールされていない

**解決**:
```bash
# キャッシュをクリアして再インストール
rm -rf node_modules package-lock.json
npm install
```

### グラフが表示されない

**原因**: ブラウザのコンソールにエラーがある

**解決**:
1. ブラウザの開発者ツール（F12）を開く
2. Console タブでエラーメッセージを確認
3. キャッシュをクリア（Ctrl+Shift+Delete）して再読み込み

## プロジェクト構造の理解

```
instagram-dashboard-vercel/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx               # ルートレイアウト（全ページ共通）
│   ├── page.tsx                 # ホームページ（/ にアクセス時）
│   └── globals.css              # グローバルスタイル
│
├── components/                   # React コンポーネント
│   ├── Dashboard.tsx            # メインダッシュボード
│   ├── KPICard.tsx              # KPI 指標カード
│   ├── ChartComponent.tsx       # グラフ（折れ線、棒、円など）
│   ├── PostPerformanceTable.tsx # 投稿パフォーマンステーブル
│   ├── HashtagAnalysis.tsx      # ハッシュタグ分析コンポーネント
│   ├── DateRangeSelector.tsx    # 期間選択フィルター
│   ├── ExportButton.tsx         # PDF/PNG エクスポート
│   └── DarkModeToggle.tsx       # ダークモード切り替え
│
├── lib/                          # ユーティリティと共有関数
│   ├── utils.ts                 # フォーマット、計算など
│   ├── analytics.ts             # サンプルデータジェネレーター
│   └── store.ts                 # Zustand状態管理
│
├── public/                       # 静的ファイル
│
├── 設定ファイル
│   ├── package.json             # npm パッケージ定義
│   ├── tsconfig.json            # TypeScript 設定
│   ├── next.config.js           # Next.js 設定
│   ├── tailwind.config.js       # Tailwind CSS 設定
│   ├── postcss.config.js        # PostCSS 設定
│   └── vercel.json              # Vercel デプロイ設定
│
└── ドキュメント
    ├── README.md                # プロジェクト概要
    ├── SETUP_GUIDE.md           # このファイル
    └── .env.example             # 環境変数例
```

## 開発時のコマンド

### 開発サーバーの起動
```bash
npm run dev
```

### 型チェック
```bash
npm run type-check
```

### ビルド（本番環境向け）
```bash
npm run build
npm start
```

## カスタマイズ方法

### ダッシュボードのタイトルを変更

`app/layout.tsx` を編集:
```tsx
export const metadata: Metadata = {
  title: 'あなたの会社名 - Instagram分析',
  description: 'カスタム説明文',
};
```

### ブランドカラーを変更

`tailwind.config.js` の colors セクション:
```js
colors: {
  instagram: {
    pink: '#YourColor1',
    purple: '#YourColor2',
    blue: '#YourColor3',
  },
}
```

### グラフの高さを変更

`components/Dashboard.tsx` で ChartComponent に height を指定:
```tsx
<ChartComponent
  // ...
  height={500}  // デフォルト: 400
/>
```

### フォントを変更

`tailwind.config.js`:
```js
fontFamily: {
  sans: ['Your Font Name', 'system-ui', 'sans-serif'],
}
```

## サンプルデータについて

このダッシュボードはサンプルデータを使用しています。

### サンプルデータの生成場所

`lib/analytics.ts` に以下の関数があります：

- `generateAnalyticsData()` - 90日分の日次データ
- `generatePostData()` - 20件の投稿データ
- `generateHashtagData()` - 15個のハッシュタグ
- `generateTimeOfDayData()` - 時間帯別データ
- `generateDayOfWeekData()` - 曜日別データ

### 実際のデータに置き換える

API から取得したデータをこれらの関数の代わりに使用できます：

```tsx
// components/Dashboard.tsx
const analyticsData = useMemo(() => {
  // API から実データを取得
  return fetchFromInstagramAPI();
}, [dateRange]);
```

## パフォーマンス最適化

### コード分割の確認
```bash
npm run build

# 出力例:
# Route (pages)                   Size     First Load JS
# ┌ ○ /                          XXXKB       XXX kB
```

### 画像の最適化
プロジェクトに画像を追加する場合：
```tsx
import Image from 'next/image';

<Image
  src="/path/to/image.png"
  width={300}
  height={300}
  alt="説明"
  loading="lazy"
/>
```

## デバッグ方法

### ブラウザの開発者ツール

```
F12 または Cmd+Option+I を押す
```

### React Developer Tools
[Chromeウェブストア](https://chromestore.google.com) から拡張機能をインストール

### Next.js デバッグログ
```bash
npm run dev -- --debug
```

## セキュリティに関する注意

- **環境変数**: `.env.local` に機密情報を保存
- **API キー**: クライアント側に露出しない（`NEXT_PUBLIC_` プレフィックス以外）
- **入力検証**: 外部データは必ず検証

## 次のステップ

1. **カスタマイズ**
   - ブランドカラーを変更
   - ロゴを追加
   - レイアウトを調整

2. **API 統合**
   - Instagram Graph API と統合
   - データベースで履歴を管理

3. **デプロイ**
   - Vercel にデプロイ
   - カスタムドメインを設定

4. **機能追加**
   - リアルタイム通知
   - カスタムレポート生成
   - ユーザー認証

## サポートとフィードバック

- **Issue**: GitHub Issues で問題を報告
- **PR**: 改善提案はプルリクエストで
- **ディスカッション**: GitHub Discussions で質問

## 参考リソース

- [Next.js ドキュメント](https://nextjs.org/docs)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [Recharts ドキュメント](https://recharts.org)
- [TypeScript ドキュメント](https://www.typescriptlang.org/docs)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api)

## よくある質問（FAQ）

**Q: 本番環境にデプロイするには？**
A: README.md の「Vercelへのデプロイ」セクションを参照してください。

**Q: 複数のアカウントに対応できますか？**
A: 現在はシングルアカウント対応です。複数アカウント対応は今後の改善予定です。

**Q: モバイルアプリはありますか？**
A: 現在は Web ダッシュボードのみです。今後、React Native 版を検討予定です。

**Q: オフライン で使用できますか？**
A: いいえ、サーバー側の処理が必要です。PWA 対応は今後の予定です。

---

ご質問やトラブルに関しては、プロジェクトの Issue セクションでお気軽にお問い合わせください。
