import { Size } from './common';

/**
 * エディタ関連の型定義
 */

// エディタ設定
export interface EditorConfig {
  theme: 'light' | 'dark';
  fontSize: number;
  lineHeight: number;
  tabSize: number;
  wordWrap: 'on' | 'off';
  minimap: boolean;
}

// エディタの状態
export interface EditorState {
  content: string;
  selection: Selection | null;
  scrollPosition: number;
  viewportSize: Size;
}

// 選択範囲
export interface Selection {
  start: Position;
  end: Position;
}

export interface Position {
  line: number;
  column: number;
}

// プレビュー設定
export interface PreviewConfig {
  zoom: number;
  syncScroll: boolean;
  showLineNumbers: boolean;
  renderMermaid: boolean;
}

// ツールバーアイテム
export interface ToolbarItem {
  id: string;
  label: string;
  icon?: string;
  action: () => void;
  disabled?: boolean;
  tooltip?: string;
}