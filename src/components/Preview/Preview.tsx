import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import PreviewToolbar from './PreviewToolbar';
import { PreviewProps } from './PreviewTypes';
import './styles.css';

// MarkedのオプションをカスタマイズしてXSSを防止
marked.setOptions({
  gfm: true,
  breaks: true,
  sanitize: false,
  headerIds: true,
  mangle: false
});

const Preview: React.FC<PreviewProps> = ({
  markdown,
  onElementSelect
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isScrollSyncEnabled, setIsScrollSyncEnabled] = useState(true);

  useEffect(() => {
    // プレビュー内の要素にクリックイベントを追加
    const addClickHandlers = () => {
      if (!previewRef.current || !onElementSelect) return;

      const elements = previewRef.current.querySelectorAll('*');
      elements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.addEventListener('click', (e) => {
            e.stopPropagation();
            onElementSelect(element);
          });
        }
      });
    };

    // マークダウンをHTMLに変換してプレビューを更新
    if (previewRef.current) {
      const html = marked(markdown);
      previewRef.current.innerHTML = html;
      addClickHandlers();
    }
  }, [markdown, onElementSelect]);

  // プレビューの更新
  const handleRefresh = () => {
    if (previewRef.current) {
      const html = marked(markdown);
      previewRef.current.innerHTML = html;
    }
  };

  // 新しいタブでプレビューを開く
  const handleOpenInNewTab = () => {
    const html = marked(markdown);
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Markdown Preview</title>
            <style>
              body {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              }
            </style>
          </head>
          <body>${html}</body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  // スクロール同期の切り替え
  const handleToggleScrollSync = () => {
    setIsScrollSyncEnabled(!isScrollSyncEnabled);
  };

  return (
    <div className="preview-wrapper">
      <PreviewToolbar
        onRefresh={handleRefresh}
        onOpenInNewTab={handleOpenInNewTab}
        onToggleScrollSync={handleToggleScrollSync}
        isScrollSyncEnabled={isScrollSyncEnabled}
      />
      <div
        ref={previewRef}
        className="preview-content markdown-body"
      />
    </div>
  );
};

export default Preview;