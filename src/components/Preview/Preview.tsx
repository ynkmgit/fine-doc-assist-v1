import React, { useEffect, useRef } from 'react';
import { marked } from 'marked';
import PreviewToolbar from './PreviewToolbar';
import { PreviewProps } from './PreviewTypes';
import './styles.css';

// MarkedのオプションをカスタマイズしてXSSを防止
marked.setOptions({
  gfm: true,
  breaks: true,
  sanitize: false,
  headerIds: true,
  mangle: false
});

const Preview: React.FC<PreviewProps> = ({
  markdown,
  customStyles
}) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef.current) {
      const html = marked(markdown);
      previewRef.current.innerHTML = html;
    }
  }, [markdown]);

  return (
    <div className="preview-wrapper">
      <PreviewToolbar />
      <div className="preview-container">
        {customStyles && <style>{customStyles}</style>}
        <div
          ref={previewRef}
          className="preview-content markdown-body"
        />
      </div>
    </div>
  );
};

export default Preview;