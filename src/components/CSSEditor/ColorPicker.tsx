import React, { useState, useEffect } from 'react';
import { ColorPickerProps } from './CSSEditorTypes';
import './styles.css';

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange
}) => {
  const [currentColor, setCurrentColor] = useState(color);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCurrentColor(newColor);
    onChange(newColor);
  };

  const presetColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#808080', '#C0C0C0'
  ];

  return (
    <div className="color-picker">
      <div 
        className="color-preview"
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: currentColor }}
      >
        <span className="color-value">{currentColor}</span>
      </div>
      {isOpen && (
        <div className="color-picker-popup">
          <input
            type="color"
            value={currentColor}
            onChange={handleColorChange}
            className="color-input"
          />
          <div className="preset-colors">
            {presetColors.map((presetColor) => (
              <div
                key={presetColor}
                className="preset-color"
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  setCurrentColor(presetColor);
                  onChange(presetColor);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;