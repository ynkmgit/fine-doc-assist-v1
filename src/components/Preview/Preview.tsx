import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import PreviewToolbar from './PreviewToolbar';
import { PreviewProps } from './PreviewTypes';
import { initializeMermaid, renderMermaid } from '../../services/mermaid/renderer';
import './styles.css';
import './Preview.css';

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
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [processedMarkdown, setProcessedMarkdown] = useState(markdown);
  
  useEffect(() => {
    initializeMermaid();
  }, []);

  // スタイルの適用を管理
  useEffect(() => {
    if (!previewRef.current) return;

    // 既存のスタイル要素を削除
    if (styleRef.current) {
      styleRef.current.remove();
      styleRef.current = null;
    }

    if (customStyles) {
      // スコープ付きのスタイルを作成
      const scopedStyles = customStyles.replace(
        /([^{]*){([^}]*)}/g,
        (match, selector, rules) => {
          // セレクタをプレビュー内に限定
          const scopedSelector = selector
            .split(',')
            .map(s => `.preview-scope ${s.trim()}`)
            .join(',');
          return `${scopedSelector}{${rules}}`;
        }
      );

      // 新しいスタイル要素を作成
      const styleElement = document.createElement('style');
      styleElement.textContent = scopedStyles;
      styleRef.current = styleElement;
      previewRef.current.appendChild(styleElement);
    }

    // コンポーネントのクリーンアップ時にスタイルを削除
    return () => {
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }
    };
  }, [customStyles]);

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
      const contentDiv = previewRef.current.querySelector('.preview-content');
      if (contentDiv) {
        contentDiv.innerHTML = html;
      }
    }
  }, [processedMarkdown]);

  return (
    <div className="preview-wrapper">
      <PreviewToolbar />
      <div 
        className="preview-container preview-scope"
        ref={previewRef}
      >
        <div className="preview-content markdown-body" />
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