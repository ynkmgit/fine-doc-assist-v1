import React, { useState } from 'react';
import Editor from './components/Editor/Editor';
import Preview from './components/Preview/Preview';
import SplitView from './components/Layout/SplitView';
import './styles/global.css';

type EditorTab = 'markdown' | 'css' | 'html';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('# Welcome to Fine Doc Assist\n\nStart editing to see the preview!');
  const [css, setCss] = useState<string>('');
  const [html, setHtml] = useState<string>('');
  const [activeTab, setActiveTab] = useState<EditorTab>('markdown');

  const handleEditorChange = (value: string) => {
    switch (activeTab) {
      case 'markdown':
        setMarkdown(value);
        break;
      case 'css':
        setCss(value);
        break;
      case 'html':
        setHtml(value);
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
            markdown={markdown}
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