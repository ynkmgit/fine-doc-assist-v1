import React, { useState, useCallback } from 'react';
import './styles.css';

interface SplitViewProps {
  left: React.ReactNode;
  right: React.ReactNode;
  defaultSplit?: number; // パーセンテージ (0-100)
  minSize?: number; // 最小サイズ (px)
}

const SplitView: React.FC<SplitViewProps> = ({
  left,
  right,
  defaultSplit = 50,
  minSize = 200
}) => {
  const [splitPosition, setSplitPosition] = useState(defaultSplit);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;

      const container = e.currentTarget as HTMLDivElement;
      const containerRect = container.getBoundingClientRect();
      const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // 最小サイズの制限を適用
      const minSizePercent = (minSize / containerRect.width) * 100;
      const limitedPosition = Math.min(Math.max(newPosition, minSizePercent), 100 - minSizePercent);

      setSplitPosition(limitedPosition);
    },
    [isDragging, minSize]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      className={`split-view ${isDragging ? 'dragging' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="split-view-panel"
        style={{ width: `${splitPosition}%` }}
      >
        {left}
      </div>
      <div
        className="split-view-divider"
        onMouseDown={handleMouseDown}
      />
      <div
        className="split-view-panel"
        style={{ width: `${100 - splitPosition}%` }}
      >
        {right}
      </div>
    </div>
  );
};

export default SplitView;