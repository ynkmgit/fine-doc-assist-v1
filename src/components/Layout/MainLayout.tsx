import React from 'react';
import { LayoutProps } from './LayoutTypes';
import './styles.css';

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;