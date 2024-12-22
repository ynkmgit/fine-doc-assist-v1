import React from 'react';
import { PreviewToolbarProps } from './PreviewTypes';
import './styles.css';

const PreviewToolbar: React.FC<PreviewToolbarProps> = ({
  onRefresh,
  onOpenInNewTab,
  onToggleScrollSync,
  isScrollSyncEnabled
}) => {
  return (
    <div className="preview-toolbar">
      <div className="toolbar-group">
        <button
          className="toolbar-button"
          onClick={onRefresh}
          title="プレビューを更新"
        >
          <span className="toolbar-icon">🔄</span>
          更新
        </button>
        <button
          className="toolbar-button"
          onClick={onOpenInNewTab}
          title="新しいタブで開く"
        >
          <span className="toolbar-icon">⧉</span>
          新規タブ
        </button>
        <button
          className={`toolbar-button ${isScrollSyncEnabled ? 'active' : ''}`}
          onClick={onToggleScrollSync}
          title="スクロール同期"
        >
          <span className="toolbar-icon">🔗</span>
          同期
        </button>
      </div>
    </div>
  );
};

export default PreviewToolbar;