import { editor } from 'monaco-editor';

export interface EditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  language?: string;
  theme?: 'vs' | 'vs-dark' | 'hc-black';
}

export interface EditorToolbarProps {
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  isDirty?: boolean;
}

export interface EditorConfig {
  fontSize: number;
  lineNumbers: 'on' | 'off';
  wordWrap: 'on' | 'off';
  minimap: {
    enabled: boolean;
  };
  theme: 'vs' | 'vs-dark' | 'hc-black';
}

export interface MonacoEditorInstance {
  editor: editor.IStandaloneCodeEditor | null;
  container: HTMLDivElement | null;
}