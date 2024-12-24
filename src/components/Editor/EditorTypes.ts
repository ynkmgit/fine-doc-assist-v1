import * as monaco from 'monaco-editor';

export interface EditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  language?: string;
  theme?: string;
  onCSSReceive?: (cssData: {selector: string; styles: string}) => void;
}

export interface MonacoEditorInstance {
  editor: monaco.editor.IStandaloneCodeEditor | null;
  container: HTMLDivElement | null;
}

export interface CSSData {
  selector: string;
  styles: string;
}