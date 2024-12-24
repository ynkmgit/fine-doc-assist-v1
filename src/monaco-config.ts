// Monaco Editor configuration
import * as monaco from 'monaco-editor';

export const configureMonaco = () => {
  // モナコエディタの基本設定
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false,
  });

  // HTML言語の設定
  monaco.languages.html.htmlDefaults.setOptions({
    format: {
      tabSize: 2,
      insertSpaces: true
    },
    suggest: {
      html5: true
    }
  });

  // その他の設定は必要に応じて追加
};