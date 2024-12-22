export interface CSSEditorProps {
  selectedElement: HTMLElement | null;
  onStyleChange?: (styles: Record<string, string>) => void;
}

export interface PropertyPanelProps {
  selectedElement: HTMLElement | null;
  currentStyles: Record<string, string>;
  onPropertyChange: (property: string, value: string) => void;
  onPropertySelect: (property: string | null) => void;
}

export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export interface CSSProperty {
  name: string;
  label: string;
  type: 'text' | 'color' | 'select';
  options?: string[];
  defaultValue?: string;
}