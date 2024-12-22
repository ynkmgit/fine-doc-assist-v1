import React from 'react';
import { PropertyPanelProps } from './CSSEditorTypes';

export const PropertyPanel: React.FC<PropertyPanelProps> = ({ properties, onChange }) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-4">スタイルプロパティ</h3>
      <div className="space-y-4">
        {properties.map((prop) => (
          <div key={prop.name} className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">{prop.name}</label>
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={prop.value}
              onChange={(e) => onChange(prop.name, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};