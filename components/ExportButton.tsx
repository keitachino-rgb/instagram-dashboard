'use client';

import React, { useRef, useState } from 'react';
import { Download, FileJson, Image, FileText } from 'lucide-react';
import { downloadCanvas, formatDateTime } from '@/lib/utils';

interface ExportButtonProps {
  dashboardRef?: React.RefObject<HTMLDivElement>;
  data?: any;
}

export function ExportButton({ dashboardRef, data }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleExportPNG = async () => {
    if (!dashboardRef?.current) return;
    setIsExporting(true);
    try {
      await downloadCanvas(dashboardRef.current, 'instagram-dashboard', 'png');
    } catch (error) {
      console.error('PNG export failed:', error);
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  const handleExportPDF = async () => {
    if (!dashboardRef?.current) return;
    setIsExporting(true);
    try {
      await downloadCanvas(dashboardRef.current, 'instagram-dashboard', 'pdf');
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  const handleExportJSON = () => {
    if (!data) return;
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `instagram-dashboard-${formatDateTime(new Date())}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-instagram-pink via-instagram-purple to-instagram-blue text-white font-medium transition-smooth hover:shadow-lg disabled:opacity-50"
      >
        <Download className="w-4 h-4" />
        {isExporting ? 'エクスポート中...' : 'エクスポート'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-200 dark:border-dark-border z-50 animate-slide-in">
          <button
            onClick={handleExportPNG}
            className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-100 dark:hover:bg-dark-border transition-colors first:rounded-t-lg text-gray-900 dark:text-white"
          >
            <Image className="w-4 h-4" />
            <div>
              <div className="font-medium">PNG画像</div>
              <div className="text-xs text-gray-500">ダッシュボード全体</div>
            </div>
          </button>

          <button
            onClick={handleExportPDF}
            className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-100 dark:hover:bg-dark-border transition-colors text-gray-900 dark:text-white"
          >
            <FileText className="w-4 h-4" />
            <div>
              <div className="font-medium">PDFレポート</div>
              <div className="text-xs text-gray-500">高品質出力</div>
            </div>
          </button>

          {data && (
            <button
              onClick={handleExportJSON}
              className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-gray-100 dark:hover:bg-dark-border transition-colors last:rounded-b-lg text-gray-900 dark:text-white"
            >
              <FileJson className="w-4 h-4" />
              <div>
                <div className="font-medium">JSONデータ</div>
                <div className="text-xs text-gray-500">詳細データ</div>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
