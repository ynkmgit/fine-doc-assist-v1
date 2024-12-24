import React, { useState } from 'react';
import { PropertyPanel } from './PropertyPanel';
import { ColorPicker } from './ColorPicker';
import { CSSEditorProps, StyleProperty } from './CSSEditorTypes';

export const CSSEditor: React.FC<CSSEditorProps> = ({ value, onChange }) => {
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [cssProperties, setCssProperties] = useState<StyleProperty[]>([]);

  const handleElementSelect = (element: HTMLElement) => {
    if (!element.closest('.preview-scope')) {
      return; // プレビュースコープ外の要素は選択不可
    }
    
    setSelectedElement(element);
    const computedStyle = window.getComputedStyle(element);
    const properties: StyleProperty[] = [];
    for (let i = 0; i < computedStyle.length; i++) {
      const property = computedStyle[i];
      properties.push({
        name: property,
        value: computedStyle.getPropertyValue(property)
      });
    }
    setCssProperties(properties);
  };

  const handleStyleChange = (property: string, value: string) => {
    if (selectedElement && selectedElement.closest('.preview-scope')) {
      selectedElement.style.setProperty(property, value);
      const updatedCSS = generateCSSString(selectedElement);
      onChange(updatedCSS);
    }
  };

  const generateCSSString = (element: HTMLElement): string => {
    const selector = generateSelector(element);
    const styles = Array.from(element.style)
      .map(property => `${property}: ${element.style.getPropertyValue(property)};`)
      .join('\n');
    
    if (!styles.trim()) {
      return '';
    }
    
    // プレビュースコープ内のセレクタを生成
    return `${selector} {\n${styles}\n}`;
  };

  const generateSelector = (element: HTMLElement): string => {
    let selector: string;
    
    if (element.id) {
      selector = `#${element.id}`;
    } else if (element.className) {
      // preview-scopeクラスは除外
      const classes = element.className.split(' ')
        .filter(cls => cls !== 'preview-scope')
        .join('.');
      selector = classes ? `.${classes}` : element.tagName.toLowerCase();
    } else {
      selector = element.tagName.toLowerCase();
    }

    // セレクタのスコープを保証
    if (!selector.includes('.preview-scope')) {
      selector = `.preview-scope ${selector}`;
    }
    
    return selector;
  };

  return (
    <div className="h-full flex">
      <div className="w-3/4 h-full bg-white">
        <div className="p-4 h-full">
          <div
            className="preview-area h-full border rounded p-4 overflow-auto"
            dangerouslySetInnerHTML={{ __html: value }}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target !== e.currentTarget) {
                handleElementSelect(target);
              }
            }}
          />
        </div>
      </div>
      <div className="w-1/4 h-full border-l">
        {selectedElement ? (
          <>
            <PropertyPanel
              properties={cssProperties}
              onChange={handleStyleChange}
            />
            <ColorPicker
              onChange={(color) => handleStyleChange('color', color)}
            />
          </>
        ) : (
          <div className="p-4 text-gray-500">
            編集したい要素をクリックしてください
          </div>
        )}
      </div>
    </div>
  );
};