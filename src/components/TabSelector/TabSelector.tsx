import React from 'react';
import './TabSelector.css';

export type TabType = 'editor' | 'preview' | 'css';

interface TabSelectorProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div className="tab-selector">
      <button
        className={`tab-button ${activeTab === 'editor' ? 'active' : ''}`}
        onClick={() => onTabChange('editor')}
      >
        Editor
      </button>
      <button
        className={`tab-button ${activeTab === 'preview' ? 'active' : ''}`}
        onClick={() => onTabChange('preview')}
      >
        Preview
      </button>
      <button
        className={`tab-button ${activeTab === 'css' ? 'active' : ''}`}
        onClick={() => onTabChange('css')}
      >
        CSS Editor
      </button>
    </div>
  );
};

export default TabSelector;