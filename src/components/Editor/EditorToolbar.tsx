import React from 'react';
import { EditorToolbarProps } from './EditorTypes';
import './styles.css';

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onSave,
  onUndo,
  onRedo,
  isDirty
}) => {
  return (
    <div className="editor-toolbar">
      <div className="toolbar-group">
        <button
          className="toolbar-button"
          onClick={onSave}
          title="保存 (Ctrl+S)"
          disabled={!isDirty}
        >
          <span className="toolbar-icon">💾</span>
          保存
        </button>
        <button
          className="toolbar-button"
          onClick={onUndo}
          title="元に戻す (Ctrl+Z)"
        >
          <span className="toolbar-icon">↩️</span>
          元に戻す
        </button>
        <button
          className="toolbar-button"
          onClick={onRedo}
          title="やり直し (Ctrl+Y)"
        >
          <span className="toolbar-icon">↪️</span>
          やり直し
        </button>
      </div>
      {isDirty && <span className="dirty-indicator">*</span>}
    </div>
  );
};

export default EditorToolbar;