import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import EditorToolbar from './EditorToolbar';
import { EditorProps, MonacoEditorInstance } from './EditorTypes';
import './styles.css';

const Editor: React.FC<EditorProps> = ({
  initialValue = '',
  onChange,
  language = 'markdown',
  theme = 'vs'
}) => {
  const [editorInstance, setEditorInstance] = useState<MonacoEditorInstance>({
    editor: null,
    container: null
  });
  const [isDirty, setIsDirty] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!editorRef.current) return;

    // エディタインスタンスの作成
    const editor = monaco.editor.create(editorRef.current, {
      value: initialValue,
      language,
      theme,
      automaticLayout: true,
      minimap: {
        enabled: true
      },
      fontSize: 14,
      lineNumbers: 'on',
      wordWrap: 'on',
      scrollBeyondLastLine: false,
      renderWhitespace: 'all',
      contextmenu: true,
      multiCursorModifier: 'altKey',
      lineDecorationsWidth: 5,
      renderLineHighlight: 'all',
      scrollbar: {
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10
      }
    });

    // 変更イベントのハンドリング
    editor.onDidChangeModelContent(() => {
      const value = editor.getValue();
      onChange?.(value);
      setIsDirty(true);
    });

    // エディタインスタンスの保存
    setEditorInstance({
      editor,
      container: editorRef.current
    });

    // クリーンアップ
    return () => {
      editor.dispose();
    };
  }, []);

  // テーマの変更を監視
  useEffect(() => {
    if (editorInstance.editor) {
      monaco.editor.setTheme(theme);
    }
  }, [theme]);

  const handleSave = () => {
    if (editorInstance.editor) {
      // 保存処理をここに実装
      setIsDirty(false);
    }
  };

  const handleUndo = () => {
    editorInstance.editor?.trigger('keyboard', 'undo', null);
  };

  const handleRedo = () => {
    editorInstance.editor?.trigger('keyboard', 'redo', null);
  };

  return (
    <div className="editor-wrapper">
      <EditorToolbar
        onSave={handleSave}
        onUndo={handleUndo}
        onRedo={handleRedo}
        isDirty={isDirty}
      />
      <div ref={editorRef} className="editor-container" />
    </div>
  );
};

export default Editor;