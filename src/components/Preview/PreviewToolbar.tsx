import React from 'react';
import { PreviewToolbarProps } from './PreviewTypes';
import './styles.css';

const PreviewToolbar: React.FC<PreviewToolbarProps> = ({ markdown, customStyles }) => {
  const openInNewTab = () => {
    // プレビューHTML全体を構築
    const previewHTML = `
      <!DOCTYPE html>
      <html lang="ja">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Preview</title>
          <style>
            ${customStyles || ''}
            /* 基本スタイル */
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background: #ffffff;
            }
            .preview-content {
              max-width: 900px;
              margin: 0 auto;
              padding: 20px;
            }
            /* マークダウンスタイル */
            .markdown-body {
              color: #24292e;
              font-size: 16px;
              line-height: 1.5;
            }
          </style>
        </head>
        <body>
          <div class="preview-content markdown-body">
            ${markdown}
          </div>
        </body>
      </html>
    `;

    // 新しいウィンドウを開いてHTMLを書き込む
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(previewHTML);
      newWindow.document.close();
    }
  };

  return (
    <div className="preview-toolbar">
      <div className="toolbar-left-group">
        <button
          className="toolbar-button"
          onClick={openInNewTab}
          title="新しいタブで開く"
        >
          <span className="toolbar-button-icon">⧉</span>
          <span>新しいタブで開く</span>
        </button>
      </div>
      <div className="toolbar-right-group">
        <div className="notice-text">
          <div className="notice-text-content">
            ※ マーメイド図使用時: HTMLエディタでの表示や編集後のマークダウン表記に影響が出る場合があります
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewToolbar;