export interface CSSEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export interface StyleProperty {
  name: string;
  value: string;
}

export interface PropertyPanelProps {
  properties: StyleProperty[];
  onChange: (property: string, value: string) => void;
}

export interface ColorPickerProps {
  onChange: (color: string) => void;
}