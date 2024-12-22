import React, { useState } from 'react';
import { LayoutProps } from './LayoutTypes';
import Sidebar from './Sidebar';
import './styles.css';

const MainLayout: React.FC<LayoutProps> = ({
  children,
  sidebarOpen: initialSidebarOpen = true,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(initialSidebarOpen);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout-container">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={handleSidebarToggle}
        items={[
          {
            id: 'editor',
            label: 'エディタ',
            onClick: () => { /* エディタ切り替え処理 */ }
          },
          {
            id: 'preview',
            label: 'プレビュー',
            onClick: () => { /* プレビュー切り替え処理 */ }
          },
          {
            id: 'css',
            label: 'CSSエディタ',
            onClick: () => { /* CSSエディタ切り替え処理 */ }
          }
        ]}
      />
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;