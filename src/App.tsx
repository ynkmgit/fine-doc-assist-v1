import React, { useState, useCallback, useRef } from 'react';
import Editor from './components/Editor/Editor';
import Preview from './components/Preview/Preview';
import SplitView from './components/Layout/SplitView';
import { useMarkdown } from './hooks/useMarkdown';
import { CSSData } from './components/Editor/EditorTypes';
import './styles/global.css';

type EditorTab = 'markdown' | 'css' | 'html';

const initialMarkdown = '# Welcome to Fine Doc Assist\n\nStart editing to see the preview!';

const App: React.FC = () => {
  const { markdown, html, updateMarkdown, updateHtml } = useMarkdown(initialMarkdown);
  const [css, setCss] = useState<string>('');
  const [activeTab, setActiveTab] = useState<EditorTab>('markdown');
  const appendCSSRef = useRef<(data: CSSData) => void>();

  const handleEditorChange = (value: string) => {
    switch (activeTab) {
      case 'markdown':
        updateMarkdown(value);
        break;
      case 'css':
        setCss(value);
        break;
      case 'html':
        updateHtml(value);
        break;
    }
  };

  const getCurrentValue = () => {
    switch (activeTab) {
      case 'markdown':
        return markdown;
      case 'css':
        return css;
      case 'html':
        return html;
      default:
        return markdown;
    }
  };

  // CSSエディタへの反映関数
  const handleCSSReceive = useCallback((appendCSS: (data: CSSData) => void) => {
    appendCSSRef.current = appendCSS;
  }, []);

  // プレビューからのスタイル適用要求を処理
  const handleApplyToCSSEditor = useCallback((cssData: CSSData) => {
    if (appendCSSRef.current) {
      appendCSSRef.current(cssData);
      // CSSタブに切り替え
      setActiveTab('css');
    }
  }, []);

  return (
    <div className="app-layout">
      <div className="editor-tabs">
        <button
          className={`tab-button ${activeTab === 'markdown' ? 'active' : ''}`}
          onClick={() => setActiveTab('markdown')}
        >
          Markdown
        </button>
        <button
          className={`tab-button ${activeTab === 'html' ? 'active' : ''}`}
          onClick={() => setActiveTab('html')}
        >
          HTML
        </button>
        <button
          className={`tab-button ${activeTab === 'css' ? 'active' : ''}`}
          onClick={() => setActiveTab('css')}
        >
          CSS
        </button>
      </div>
      <SplitView 
        left={
          <Editor
            key={activeTab}
            initialValue={getCurrentValue()}
            onChange={handleEditorChange}
            language={activeTab}
            onCSSReceive={activeTab === 'css' ? handleCSSReceive : undefined}
          />
        }
        right={
          <Preview
            markdown={markdown}
            customStyles={css}
            onApplyToCSSEditor={handleApplyToCSSEditor}
          />
        }
        defaultSplit={50}
        minSize={300}
      />
    </div>
  );
};

export default App;