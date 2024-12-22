import React, { useState } from 'react';
import Editor from './components/Editor/Editor';
import Preview from './components/Preview/Preview';
import SplitView from './components/Layout/SplitView';
import './styles/global.css';

type EditorTab = 'markdown' | 'css';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('# Welcome to Fine Doc Assist\n\nStart editing to see the preview!');
  const [css, setCss] = useState<string>('');
  const [activeTab, setActiveTab] = useState<EditorTab>('markdown');

  const handleEditorChange = (value: string) => {
    if (activeTab === 'markdown') {
      setMarkdown(value);
    } else {
      setCss(value);
    }
  };

  const getCurrentValue = () => {
    return activeTab === 'markdown' ? markdown : css;
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