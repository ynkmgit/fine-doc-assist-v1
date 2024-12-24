import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import EditorToolbar from './EditorToolbar';
import { EditorProps, MonacoEditorInstance, CSSData } from './EditorTypes';
import './styles.css';

// カスタムダークテーマの定義
monaco.editor.defineTheme('customDark', {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: '', foreground: 'd4d4d4', background: '1e1e1e' },
    { token: 'comment', foreground: '608b4e' },
    { token: 'keyword', foreground: '569cd6' },
    { token: 'string', foreground: 'ce9178' },
    { token: 'number', foreground: 'b5cea8' },
  ],
  colors: {
    'editor.background': '#1e1e1e',
    'editor.foreground': '#d4d4d4',
    'editor.lineHighlightBackground': '#2d2d2d',
    'editor.selectionBackground': '#264f78',
    'editor.inactiveSelectionBackground': '#3a3d41',
    'editorLineNumber.foreground': '#858585',
    'editorLineNumber.activeForeground': '#c6c6c6',
    'editorCursor.foreground': '#d4d4d4',
    'editor.selectionHighlightBackground': '#add6ff26',
    'editor.wordHighlightBackground': '#575757b8',
    'editor.wordHighlightStrongBackground': '#004972b8',
    'editorBracketMatch.background': '#0064001a',
    'editorBracketMatch.border': '#888',
  }
});

const Editor: React.FC<EditorProps> = ({
  initialValue = '',
  onChange,
  language = 'markdown',
  theme = 'customDark',
  onCSSReceive
}) => {
  const [editorInstance, setEditorInstance] = useState<MonacoEditorInstance>({
    editor: null,
    container: null
  });
  const [isDirty, setIsDirty] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  
  // CSS適用のための新しい関数
  const appendCSSToEditor = ({ selector, styles }: CSSData) => {
    if (!editorInstance.editor) return;

    const currentValue = editorInstance.editor.getValue();
    const cssRule = `${selector} {\n${styles}\n}\n`;

    // CSSルールが既に存在するか確認
    const selectorRegex = new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*{[^}]*}`, 'g');
    const existingRule = currentValue.match(selectorRegex);

    if (existingRule) {
      // 既存のルールを更新
      const newValue = currentValue.replace(selectorRegex, cssRule.trim());
      editorInstance.editor.setValue(newValue);
    } else {
      // 新しいルールを追加
      const position = editorInstance.editor.getModel()?.getLineCount() || 0;
      const newValue = currentValue ? `${currentValue}\n\n${cssRule}` : cssRule;
      editorInstance.editor.setValue(newValue);
    }

    // カーソルを適切な位置に移動
    const lineCount = editorInstance.editor.getModel()?.getLineCount() || 0;
    editorInstance.editor.setPosition({
      lineNumber: lineCount,
      column: 1
    });

    // フォーマット
    editorInstance.editor.getAction('editor.action.formatDocument')?.run();
  };

  // onCSSReceiveの監視を追加
  useEffect(() => {
    if (onCSSReceive && language === 'css') {
      onCSSReceive(appendCSSToEditor);
    }
  }, [onCSSReceive, language, editorInstance.editor]);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = monaco.editor.create(editorRef.current, {
      value: initialValue,
      language,
      theme,
      automaticLayout: true,
      minimap: {
        enabled: true,
        showSlider: 'mouseover'
      },
      fontSize: 14,
      lineNumbers: 'on',
      wordWrap: 'on',
      scrollBeyondLastLine: false,
      renderWhitespace: 'boundary',
      contextmenu: true,
      multiCursorModifier: 'altKey',
      lineDecorationsWidth: 5,
      renderLineHighlight: 'all',
      scrollbar: {
        useShadows: true,
        verticalScrollbarSize: 10,
        horizontalScrollbarSize: 10,
        verticalHasArrows: false,
        horizontalHasArrows: false,
        vertical: 'visible',
        horizontal: 'visible',
        verticalScrollbarBorder: 0
      },
      suggest: {
        insertMode: 'replace'
      },
      quickSuggestions: {
        other: true,
        comments: true,
        strings: true
      }
    });

    editor.onDidChangeModelContent(() => {
      const value = editor.getValue();
      onChange?.(value);
      setIsDirty(true);
    });

    setEditorInstance({
      editor,
      container: editorRef.current
    });

    return () => {
      editor.dispose();
    };
  }, []);

  // 既存のuseEffect
  useEffect(() => {
    if (editorInstance.editor) {
      const model = editorInstance.editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language]);

  useEffect(() => {
    if (editorInstance.editor) {
      const currentValue = editorInstance.editor.getValue();
      if (currentValue !== initialValue) {
        editorInstance.editor.setValue(initialValue);
      }
    }
  }, [initialValue]);

  useEffect(() => {
    if (editorInstance.editor) {
      monaco.editor.setTheme(theme);
    }
  }, [theme]);

  const handleSave = () => {
    if (editorInstance.editor) {
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