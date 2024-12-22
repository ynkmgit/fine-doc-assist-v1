// Monaco Editor configuration
import * as monaco from 'monaco-editor';

export const configureMonaco = () => {
  // モナコエディタの基本設定
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false,
  });

  // その他の設定は必要に応じて追加
};