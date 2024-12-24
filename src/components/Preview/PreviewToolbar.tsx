import React from 'react';
import { PreviewToolbarProps } from './PreviewTypes';
import './styles.css';

const PreviewToolbar: React.FC<PreviewToolbarProps> = ({ markdown, customStyles }) => {
  const openInNewTab = () => {
    const previewHTML = `
      <!DOCTYPE html>
      <html lang="ja">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Preview</title>
          <style>
            ${customStyles || ''}
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
              margin: 0;
              padding-left: 20px;
              background: #ffffff;
            }
            .preview-content {
              margin: 0 auto;
            }
            .markdown-body {
              color: #24292e;
              font-size: 16px;
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
        <div className="info-icon" title="マーメイド図使用時: HTMLエディタでの表示や編集後のマークダウン表記に影響が出る場合があります">
          <span>&#9432;</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewToolbar;