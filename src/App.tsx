import React, { useState } from 'react';
import MainLayout from './components/Layout/MainLayout';
import SplitView from './components/Layout/SplitView';
import Editor from './components/Editor/Editor';
import Preview from './components/Preview/Preview';
import './styles/global.css';

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('# Welcome to Fine Doc Assist\n\nStart editing to see the preview!');

  const handleEditorChange = (value: string) => {
    setMarkdown(value);
  };

  const handleElementSelect = (element: HTMLElement) => {
    // プレビュー要素選択時の処理
    console.log('Selected element:', element);
  };

  return (
    <MainLayout>
      <SplitView
        left={
          <Editor
            initialValue={markdown}
            onChange={handleEditorChange}
            language="markdown"
          />
        }
        right={
          <Preview
            markdown={markdown}
            onElementSelect={handleElementSelect}
          />
        }
        defaultSplit={50}
        minSize={300}
      />
    </MainLayout>
  );
};

export default App;