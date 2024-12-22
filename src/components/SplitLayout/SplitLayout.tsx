import React from 'react';
import './SplitLayout.css';

const SplitLayout: React.FC = () => {
  return (
    <div className="split-layout">
      <div className="split-layout__left">{/* Left pane content */}</div>
      <div className="split-layout__right">{/* Right pane content */}</div>
    </div>
  );
};

export default SplitLayout;