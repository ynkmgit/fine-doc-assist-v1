export interface PreviewProps {
  markdown: string;
  customStyles?: string;
  onStyleSelect?: (styles: ElementStyle) => void;
  onApplyToCSSEditor?: (cssData: CSSData) => void;
}

export interface ElementStyle {
  tagName: string;
  className: string;
  id: string;
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
  }
}

export interface StyleSelectorPanelProps {
  elementStyle: ElementStyle;
  onStyleChange: (style: ElementStyle) => void;
  onClose: () => void;
  onApplyToCSSEditor: (cssData: CSSData) => void;
}

export interface CSSData {
  selector: string;
  styles: string;
}