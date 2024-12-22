export interface PreviewProps {
  markdown: string;
  onElementSelect?: (element: HTMLElement) => void;
}

export interface PreviewToolbarProps {
  onRefresh?: () => void;
  onOpenInNewTab?: () => void;
  onToggleScrollSync?: () => void;
  isScrollSyncEnabled?: boolean;
}

export interface RenderedElement {
  type: string;
  content: string;
  position: {
    start: number;
    end: number;
  };
}