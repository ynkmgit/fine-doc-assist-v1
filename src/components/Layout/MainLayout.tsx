import React, { useState } from 'react';
import { Editor } from '../Editor/Editor';
import { Preview } from '../Preview/Preview';
import { CSSEditor } from '../CSSEditor/CSSEditor';
import { TabSelector } from './TabSelector';
import { ImageManager } from '../ImageManager/ImageManager';

type Tab = 'markdown' | 'html' | 'css' | 'images';

export const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('markdown');
  const [markdown, setMarkdown] = useState<string>('');
  const [css, setCSS] = useState<string>('');

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleMarkdownChange = (value: string) => {
    setMarkdown(value);
  };

  const handleCSSChange = (value: string) => {
    setCSS(value);
  };

  return (
    <div className="h-screen flex flex-col">
      <TabSelector activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex-1 flex">
        {/* 左ペイン */}
        <div className="w-1/2 h-full">
          {activeTab === 'markdown' && (
            <Editor value={markdown} onChange={handleMarkdownChange} />
          )}
          {activeTab === 'css' && (
            <CSSEditor value={css} onChange={handleCSSChange} />
          )}
          {activeTab === 'images' && (
            <ImageManager />
          )}
        </div>
        
        {/* 右ペイン */}
        <div className="w-1/2 h-full">
          <Preview markdown={markdown} css={css} />
        </div>
      </div>
    </div>
  );
};