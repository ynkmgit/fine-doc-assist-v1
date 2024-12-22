import React from 'react';
import MainLayout from './components/Layout/MainLayout';
import SplitView from './components/Layout/SplitView';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <MainLayout>
      <SplitView
        left={
          <div className="editor-container">
            {/* ここにエディターコンポーネントが入ります */}
            <div style={{ padding: '20px' }}>Editor</div>
          </div>
        }
        right={
          <div className="preview-container">
            {/* ここにプレビューコンポーネントが入ります */}
            <div style={{ padding: '20px' }}>Preview</div>
          </div>
        }
        defaultSplit={50}
        minSize={300}
      />
    </MainLayout>
  );
};

export default App;