export interface ElementStyle {
  tagName: string;
  className: string;
  id: string;
  isMermaid?: boolean;
  styles: {
    color: string;
    backgroundColor: string;
    fontSize: string;
    fontWeight: string;
    margin: string;
    padding: string;
    border: string;
    borderRadius: string;
    textAlign: 'left' | 'center' | 'right' | 'justify';
    // マーメイド図用のスタイル
    width?: string;
    height?: string;
    display?: string;
    alignItems?: string;
    justifyContent?: string;
  };
}

export interface CSSData {
  selector: string;
  styles: Partial<ElementStyle['styles']>;
}

export interface PreviewProps {
  markdown: string;
  customStyles?: string;
  onStyleSelect?: (style: ElementStyle) => void;
  onApplyToCSSEditor?: (cssData: CSSData) => void;
}