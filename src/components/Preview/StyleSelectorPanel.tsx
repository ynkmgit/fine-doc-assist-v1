import React, { useState, useEffect } from 'react';
import { StyleSelectorPanelProps, ElementStyle } from './PreviewTypes';
import './StyleSelectorPanel.css';

const StyleSelectorPanel: React.FC<StyleSelectorPanelProps> = ({
  elementStyle,
  onStyleChange,
  onClose,
  onApplyToCSSEditor
}) => {
  const [currentStyle, setCurrentStyle] = useState<ElementStyle>(elementStyle);
  
  useEffect(() => {
    setCurrentStyle(elementStyle);
  }, [elementStyle]);

  const handleStyleChange = (
    property: keyof ElementStyle['styles'],
    value: string
  ) => {
    const updatedStyle = {
      ...currentStyle,
      styles: {
        ...currentStyle.styles,
        [property]: value
      }
    };
    setCurrentStyle(updatedStyle);
    onStyleChange(updatedStyle);
    
    // リアルタイムプレビューのためのスタイル適用
    if (property in updatedStyle.styles) {
      const selector = generateCSSSelector();
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        .preview-content ${selector} {
          ${property}: ${value} !important;
        }
      `;
      document.head.appendChild(styleElement);
    }
  };

  const generateCSSSelector = () => {
    let selector = currentStyle.tagName;
    if (currentStyle.className) {
      selector += `.${currentStyle.className.split(' ').join('.')}`;
    }
    if (currentStyle.id) {
      selector += `#${currentStyle.id}`;
    }
    return selector;
  };

  const generateCSSRules = () => {
    const rules: string[] = [];
    Object.entries(currentStyle.styles).forEach(([property, value]) => {
      if (value && value !== 'initial') {  // 初期値でないスタイルのみを出力
        rules.push(`  ${property}: ${value};`);
      }
    });
    return rules.join('\n');
  };

  const handleApplyToCSS = () => {
    onApplyToCSSEditor({
      selector: generateCSSSelector(),
      styles: generateCSSRules()
    });
  };

  return (
    <div className="style-selector-panel">
      <div className="style-selector-header">
        <h3>スタイル編集</h3>
        <button onClick={onClose} className="close-button">×</button>
      </div>

      <div className="style-selector-content">
        <div className="selector-info">
          <p>選択中の要素: {generateCSSSelector()}</p>
        </div>

        <div className="style-section">
          <h4>テキスト</h4>
          <div className="style-field">
            <label>文字色:</label>
            <input
              type="color"
              value={currentStyle.styles.color}
              onChange={(e) => handleStyleChange('color', e.target.value)}
            />
          </div>
          <div className="style-field">
            <label>フォントサイズ:</label>
            <input
              type="text"
              value={currentStyle.styles.fontSize}
              onChange={(e) => handleStyleChange('fontSize', e.target.value)}
            />
          </div>
          <div className="style-field">
            <label>文字の太さ:</label>
            <select
              value={currentStyle.styles.fontWeight}
              onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
            >
              <option value="normal">標準</option>
              <option value="bold">太字</option>
              <option value="lighter">細字</option>
            </select>
          </div>
          <div className="style-field">
            <label>文字揃え:</label>
            <select
              value={currentStyle.styles.textAlign}
              onChange={(e) => handleStyleChange('textAlign', e.target.value as ElementStyle['styles']['textAlign'])}
            >
              <option value="left">左揃え</option>
              <option value="center">中央揃え</option>
              <option value="right">右揃え</option>
              <option value="justify">両端揃え</option>
            </select>
          </div>
        </div>

        <div className="style-section">
          <h4>背景とボーダー</h4>
          <div className="style-field">
            <label>背景色:</label>
            <input
              type="color"
              value={currentStyle.styles.backgroundColor}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            />
          </div>
          <div className="style-field">
            <label>ボーダー:</label>
            <input
              type="text"
              value={currentStyle.styles.border}
              onChange={(e) => handleStyleChange('border', e.target.value)}
              placeholder="1px solid black"
            />
          </div>
          <div className="style-field">
            <label>角丸:</label>
            <input
              type="text"
              value={currentStyle.styles.borderRadius}
              onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
              placeholder="4px"
            />
          </div>
        </div>

        <div className="style-section">
          <h4>余白</h4>
          <div className="style-field">
            <label>外側の余白:</label>
            <input
              type="text"
              value={currentStyle.styles.margin}
              onChange={(e) => handleStyleChange('margin', e.target.value)}
              placeholder="8px"
            />
          </div>
          <div className="style-field">
            <label>内側の余白:</label>
            <input
              type="text"
              value={currentStyle.styles.padding}
              onChange={(e) => handleStyleChange('padding', e.target.value)}
              placeholder="8px"
            />
          </div>
        </div>

        <div className="style-actions">
          <button 
            className="action-button apply-button"
            onClick={handleApplyToCSS}
          >
            CSSエディタに反映
          </button>
        </div>
      </div>
    </div>
  );
};

export default StyleSelectorPanel;