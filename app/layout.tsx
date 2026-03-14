import type { Metadata } from 'next';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import './globals.css';

export const metadata: Metadata = {
  title: 'Instagram運用分析ダッシュボード',
  description:
    'Instagram運用の包括的な分析ダッシュボード。フォロワー推移、エンゲージメント、リーチなど各種指標を可視化。',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📊</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="antialiased">
        <DarkModeToggleWrapper />
        {children}
      </body>
    </html>
  );
}

function DarkModeToggleWrapper() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <DarkModeToggle />
    </div>
  );
}
