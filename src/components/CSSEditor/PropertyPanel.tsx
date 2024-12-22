import React from 'react';
import { PropertyPanelProps } from './CSSEditorTypes';
import './styles.css';

const commonProperties = [
  { name: 'color', label: 'Text Color', type: 'color' },
  { name: 'background-color', label: 'Background Color', type: 'color' },
  { name: 'font-size', label: 'Font Size', type: 'text' },
  { name: 'font-weight', label: 'Font Weight', type: 'select', options: ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
  { name: 'font-style', label: 'Font Style', type: 'select', options: ['normal', 'italic', 'oblique'] },
  { name: 'text-align', label: 'Text Align', type: 'select', options: ['left', 'center', 'right', 'justify'] },
  { name: 'line-height', label: 'Line Height', type: 'text' },
  { name: 'padding', label: 'Padding', type: 'text' },
  { name: 'margin', label: 'Margin', type: 'text' },
  { name: 'border', label: 'Border', type: 'text' },
  { name: 'border-radius', label: 'Border Radius', type: 'text' }
];

const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedElement,
  currentStyles,
  onPropertyChange,
  onPropertySelect
}) => {
  if (!selectedElement) {
    return (
      <div className="property-panel-empty">
        <p>Select an element to edit its styles</p>
      </div>
    );
  }

  const handleInputChange = (property: string, value: string) => {
    onPropertyChange(property, value);
  };

  const handlePropertyFocus = (property: string) => {
    onPropertySelect(property);
  };

  const handlePropertyBlur = () => {
    onPropertySelect(null);
  };

  return (
    <div className="property-panel">
      <div className="property-panel-header">
        <h3>Style Properties</h3>
        <span className="selected-element-tag">{selectedElement.tagName.toLowerCase()}</span>
      </div>
      <div className="property-list">
        {commonProperties.map(({ name, label, type, options }) => (
          <div key={name} className="property-item">
            <label htmlFor={name}>{label}</label>
            {type === 'select' ? (
              <select
                id={name}
                value={currentStyles[name] || ''}
                onChange={(e) => handleInputChange(name, e.target.value)}
                onFocus={() => handlePropertyFocus(name)}
                onBlur={handlePropertyBlur}
              >
                <option value="">Default</option>
                {options?.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                id={name}
                value={currentStyles[name] || ''}
                onChange={(e) => handleInputChange(name, e.target.value)}
                onFocus={() => handlePropertyFocus(name)}
                onBlur={handlePropertyBlur}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyPanel;