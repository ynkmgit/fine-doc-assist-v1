import React from 'react';

type Tab = 'markdown' | 'html' | 'css' | 'images';

interface TabSelectorProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const TabSelector: React.FC<TabSelectorProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-gray-200 bg-white">
      <button
        className={`px-4 py-2 ${
          activeTab === 'markdown'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => onTabChange('markdown')}
      >
        Markdown
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === 'html'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => onTabChange('html')}
      >
        HTML
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === 'css'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => onTabChange('css')}
      >
        CSS
      </button>
      <button
        className={`px-4 py-2 ${
          activeTab === 'images'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-gray-800'
        }`}
        onClick={() => onTabChange('images')}
      >
        画像
      </button>
      {activeTab === 'html' && (
        <div className="ml-4 py-2 text-yellow-600 text-sm">
          ⚠️ HTMLからMarkdownへの変換は、特にMermaid記法などの特殊な記法において
          正確な変換が保証されません。可能な限りMarkdownエディタでの編集を推奨します。
        </div>
      )}
    </div>
  );
};