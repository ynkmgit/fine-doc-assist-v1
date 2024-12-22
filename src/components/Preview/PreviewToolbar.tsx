import React from 'react';
import { PreviewToolbarProps } from './PreviewTypes';
import './styles.css';

const PreviewToolbar: React.FC<PreviewToolbarProps> = () => {
  return (
    <div className="preview-toolbar">
      <div className="toolbar-group"></div>
    </div>
  );
};

export default PreviewToolbar;