import React, { useState } from 'react';
import { ColorPickerProps } from './CSSEditorTypes';

export const ColorPicker: React.FC<ColorPickerProps> = ({ onChange }) => {
  const [color, setColor] = useState('#000000');

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="p-4 border-t">
      <h3 className="text-lg font-medium mb-4">カラーピッカー</h3>
      <div className="flex items-center space-x-4">
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-10 h-10 border-none"
        />
        <input
          type="text"
          value={color}
          onChange={handleColorChange}
          className="border rounded px-2 py-1"
        />
      </div>
    </div>
  );
};