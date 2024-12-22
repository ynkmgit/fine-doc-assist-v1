/**
 * CSSエディタ関連の型定義
 */

// CSSプロパティグループ
export type CSSPropertyGroup =
  | 'typography'
  | 'layout'
  | 'color'
  | 'border'
  | 'spacing'
  | 'effects';

// CSSプロパティ定義
export interface CSSPropertyDefinition {
  name: string;
  group: CSSPropertyGroup;
  type: 'color' | 'size' | 'text' | 'select' | 'number';
  options?: string[];
  default?: string | number;
  unit?: string;
  min?: number;
  max?: number;
}

// スタイル変更イベント
export interface StyleChangeEvent {
  element: string;
  property: string;
  value: string | number;
  important: boolean;
}

// カラーピッカー設定
export interface ColorPickerConfig {
  format: 'hex' | 'rgb' | 'hsl';
  showAlpha: boolean;
  presetColors: string[];
}

// プロパティパネル設定
export interface PropertyPanelConfig {
  groups: CSSPropertyGroup[];
  showAdvanced: boolean;
  showInherited: boolean;
}

// スタイルプリセット
export interface StylePreset {
  id: string;
  name: string;
  description: string;
  styles: Record<string, string>;
}