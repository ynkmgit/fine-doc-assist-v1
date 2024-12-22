export type Tab = 'markdown' | 'html' | 'css' | 'images';

export interface TabSelectorProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export interface MainLayoutProps {
  // 将来的な拡張のために空のインターフェースを用意
}