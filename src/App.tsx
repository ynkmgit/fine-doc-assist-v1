import React, { useState } from 'react';
import Editor from './components/Editor/Editor';
import Preview from './components/Preview/Preview';
import SplitView from './components/Layout/SplitView';
import { useMarkdown } from './hooks/useMarkdown';
import './styles/global.css';

type EditorTab = 'markdown' | 'css' | 'html';

const App: React.FC = () => {
  const { markdown, html, updateMarkdown } = useMarkdown('# Welcome to Fine Doc Assist\n\nStart editing to see the preview!');
  const [css, setCss] = useState<string>('');
  const [activeTab, setActiveTab] = useState<EditorTab>('markdown');

  const handleEditorChange = (value: string) => {
    switch (activeTab) {
      case 'markdown':
        updateMarkdown(value);
        break;
      case 'css':
        setCss(value);
        break;
      case 'html':
        // Note: HTMLタブでの編集は直接プレビューに反映されません
        // HTMLはマークダウンから生成される出力として表示されます
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
          />
        }
        right={
          <Preview
            markdown={activeTab === 'html' ? html : markdown}
            customStyles={css}
          />
        }
        defaultSplit={50}
        minSize={300}
      />
    </div>
  );
};

export default App;