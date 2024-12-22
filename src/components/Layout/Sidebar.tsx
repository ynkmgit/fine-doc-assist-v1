import React from 'react';
import { SidebarProps } from './LayoutTypes';
import './styles.css';

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  items = []
}) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button
        className="sidebar-toggle"
        onClick={onToggle}
        aria-label={isOpen ? 'サイドバーを閉じる' : 'サイドバーを開く'}
      >
        {isOpen ? '←' : '→'}
      </button>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {items.map((item) => (
            <li key={item.id} className="sidebar-menu-item">
              <button
                onClick={item.onClick}
                className="sidebar-menu-button"
              >
                {item.icon && <span className="menu-icon">{item.icon}</span>}
                <span className="menu-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;