import React, { useState } from 'react';
import * as monaco from 'monaco-editor';
import PropertyPanel from './PropertyPanel';
import ColorPicker from './ColorPicker';
import { CSSEditorProps } from './CSSEditorTypes';
import './styles.css';

const CSSEditor: React.FC<CSSEditorProps> = ({
  selectedElement,
  onStyleChange
}) => {
  const [activeProperty, setActiveProperty] = useState<string | null>(null);
  const [currentStyles, setCurrentStyles] = useState<Record<string, string>>({});
  const [isRawMode, setIsRawMode] = useState(false);

  // スタイル変更時のハンドラー
  const handleStyleChange = (property: string, value: string) => {
    const newStyles = {
      ...currentStyles,
      [property]: value
    };
    setCurrentStyles(newStyles);
    onStyleChange?.(newStyles);
  };

  // カラーピッカーの値変更時のハンドラー
  const handleColorChange = (color: string) => {
    if (activeProperty) {
      handleStyleChange(activeProperty, color);
    }
  };

  const handleRawCSSChange = (value: string) => {
    try {
      // CSSテキストをオブジェクトに変換
      const styleLines = value.split(';').filter(line => line.trim());
      const newStyles: Record<string, string> = {};
      
      styleLines.forEach(line => {
        const [property, value] = line.split(':').map(s => s.trim());
        if (property && value) {
          newStyles[property] = value;
        }
      });

      setCurrentStyles(newStyles);
      onStyleChange?.(newStyles);
    } catch (error) {
      console.error('CSS parse error:', error);
    }
  };

  const getCurrentCSSText = () => {
    return Object.entries(currentStyles)
      .map(([property, value]) => `${property}: ${value};`)
      .join('\n');
  };

  return (
    <div className="css-editor-container">
      <div className="css-editor-header">
        <h3>Style Editor</h3>
        <button 
          className={`mode-toggle ${isRawMode ? 'active' : ''}`}
          onClick={() => setIsRawMode(!isRawMode)}
        >
          {isRawMode ? 'Visual Mode' : 'Raw CSS'}
        </button>
      </div>
      {isRawMode ? (
        <div className="raw-css-editor">
          <Editor
            height="200px"
            defaultLanguage="css"
            value={getCurrentCSSText()}
            onChange={handleRawCSSChange}
            options={{
              minimap: { enabled: false },
              lineNumbers: 'off',
              scrollBeyondLastLine: false,
              wordWrap: 'on'
            }}
          />
        </div>
      ) : (
        <>
          <PropertyPanel
            selectedElement={selectedElement}
            currentStyles={currentStyles}
            onPropertyChange={handleStyleChange}
            onPropertySelect={setActiveProperty}
          />
          {activeProperty && activeProperty.includes('color') && (
            <ColorPicker
              color={currentStyles[activeProperty] || '#000000'}
              onChange={handleColorChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CSSEditor;