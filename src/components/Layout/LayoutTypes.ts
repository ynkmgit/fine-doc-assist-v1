export type LayoutProps = {
  children?: React.ReactNode;
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
};

export type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
  items?: Array<{
    id: string;
    label: string;
    icon?: string;
    onClick: () => void;
  }>;
};

export type MainContentProps = {
  children: React.ReactNode;
  isSidebarOpen: boolean;
};