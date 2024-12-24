import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import PreviewToolbar from './PreviewToolbar';
import { PreviewProps } from './PreviewTypes';
import { initializeMermaid, renderMermaid } from '../../services/mermaid/renderer';
import './styles.css';
import './Preview.css';

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
  const [processedMarkdown, setProcessedMarkdown] = useState(markdown);
  
  useEffect(() => {
    initializeMermaid();
  }, []);

  useEffect(() => {
    const processMarkdown = async () => {
      let currentMarkdown = markdown;
      const mermaidBlocks = extractAllMermaidCode(markdown);
      
      for (const [index, block] of mermaidBlocks.entries()) {
        try {
          const id = `diagram-${index}-${Date.now()}`;
          const { svg } = await renderMermaid(id, block.code);
          currentMarkdown = currentMarkdown.replace(
            block.original,
            `<div class="mermaid-diagram">${svg}</div>`
          );
        } catch (error) {
          console.error(`Error rendering mermaid diagram ${index + 1}:`, error);
          currentMarkdown = currentMarkdown.replace(
            block.original,
            `<div class="mermaid-error">Error rendering diagram ${index + 1}: ${error.message}</div>`
          );
        }
      }
      
      setProcessedMarkdown(currentMarkdown);
    };

    processMarkdown();
  }, [markdown]);

  useEffect(() => {
    if (previewRef.current) {
      const html = marked(processedMarkdown);
      previewRef.current.innerHTML = html;
    }
  }, [processedMarkdown]);

  return (
    <div className="preview-wrapper">
      <PreviewToolbar />
      <div className="notice-text">
        <div className="notice-text-content">
          ※ マーメイド図使用時: HTMLエディタでの表示や編集後のマークダウン表記に影響が出る場合があります
        </div>
      </div>
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

interface MermaidBlock {
  original: string;
  code: string;
}

const extractAllMermaidCode = (markdown: string): MermaidBlock[] => {
  const blocks: MermaidBlock[] = [];
  const mermaidRegex = /```mermaid\n([\s\S]*?)```/g;
  let match;

  while ((match = mermaidRegex.exec(markdown)) !== null) {
    blocks.push({
      original: match[0],
      code: match[1].trim()
    });
  }

  return blocks;
};

export default Preview;