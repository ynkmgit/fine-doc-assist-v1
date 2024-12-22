import React, { useState } from 'react';
import { PropertyPanel } from './PropertyPanel';
import { ColorPicker } from './ColorPicker';
import { CSSEditorProps, StyleProperty } from './CSSEditorTypes';

export const CSSEditor: React.FC<CSSEditorProps> = ({ value, onChange }) => {
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [cssProperties, setCssProperties] = useState<StyleProperty[]>([]);

  const handleElementSelect = (element: HTMLElement) => {
    setSelectedElement(element);
    // 選択された要素の現在のスタイルを取得
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
    if (selectedElement) {
      selectedElement.style.setProperty(property, value);
      // CSSの文字列を更新
      const updatedCSS = generateCSSString(selectedElement);
      onChange(updatedCSS);
    }
  };

  const generateCSSString = (element: HTMLElement): string => {
    const selector = generateSelector(element);
    const styles = Array.from(element.style)
      .map(property => `${property}: ${element.style.getPropertyValue(property)};`)
      .join('\n');
    
    // スタイルが空の場合は空のCSSを返す
    if (!styles.trim()) {
      return '';
    }
    
    return `${selector} {\n${styles}\n}`;
  };

  const generateSelector = (element: HTMLElement): string => {
    if (element.id) {
      return `#${element.id}`;
    }
    if (element.className) {
      return `.${element.className.split(' ')[0]}`;
    }
    let selector = element.tagName.toLowerCase();
    let parent = element.parentElement;
    while (parent && parent !== document.body) {
      selector = `${parent.tagName.toLowerCase()} > ${selector}`;
      parent = parent.parentElement;
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