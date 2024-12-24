import React from 'react';
import { PreviewToolbarProps } from './PreviewTypes';
import './styles.css';

const PreviewToolbar: React.FC<PreviewToolbarProps> = () => {
  return (
    <div className="preview-toolbar">
      <div className="toolbar-group">
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