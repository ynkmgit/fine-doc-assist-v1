import React, { useEffect, useRef, useState } from 'react';
import { marked } from 'marked';
import PreviewToolbar from './PreviewToolbar';
import StyleSelectorPanel from './StyleSelectorPanel';
import { PreviewProps, ElementStyle, CSSData } from './PreviewTypes';
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
  customStyles,
  onStyleSelect,
  onApplyToCSSEditor
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [processedMarkdown, setProcessedMarkdown] = useState(markdown);
  const [renderedHTML, setRenderedHTML] = useState('');
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [isStylePanelOpen, setIsStylePanelOpen] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    initializeMermaid();
  }, []);

  // マウスホバーとクリックのイベントハンドラ
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.matches('pre, pre *')) { // コードブロックは除外
        setHoveredElement(target);
        e.stopPropagation();
      }
    };

    const handleMouseOut = () => {
      setHoveredElement(null);
    };

    const handleClick = (e: MouseEvent) => {
      if (hoveredElement) {
        e.preventDefault();
        setSelectedElement(hoveredElement);
        setIsStylePanelOpen(true);
        e.stopPropagation();
      }
    };

    const previewContainer = previewRef.current?.querySelector('.preview-content');
    if (previewContainer) {
      previewContainer.addEventListener('mouseover', handleMouseOver);
      previewContainer.addEventListener('mouseout', handleMouseOut);
      previewContainer.addEventListener('click', handleClick);
    }

    return () => {
      if (previewContainer) {
        previewContainer.removeEventListener('mouseover', handleMouseOver);
        previewContainer.removeEventListener('mouseout', handleMouseOut);
        previewContainer.removeEventListener('click', handleClick);
      }
    };
  }, [hoveredElement]);

  // CSSエディタへの適用
  const handleApplyToCSSEditor = (cssData: CSSData) => {
    if (onApplyToCSSEditor) {
      onApplyToCSSEditor(cssData);
    }
  };

  // スタイルの適用を管理
  useEffect(() => {
    if (!previewRef.current) return;

    if (styleRef.current) {
      styleRef.current.remove();
      styleRef.current = null;
    }

    if (customStyles) {
      const scopedStyles = customStyles.replace(
        /([^{]*){([^}]*)}/g,
        (match, selector, rules) => {
          const scopedSelector = selector
            .split(',')
            .map(s => `.preview-scope ${s.trim()}`)
            .join(',');
          return `${scopedSelector}{${rules}}`;
        }
      );

      const styleElement = document.createElement('style');
      styleElement.textContent = scopedStyles;
      styleRef.current = styleElement;
      previewRef.current.appendChild(styleElement);
    }

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
      setRenderedHTML(html);
    }
  }, [processedMarkdown]);

  // 選択された要素のスタイル情報を取得
  const getElementStyle = (element: HTMLElement): ElementStyle => {
    const computedStyle = window.getComputedStyle(element);
    return {
      tagName: element.tagName.toLowerCase(),
      className: element.className,
      id: element.id,
      styles: {
        color: computedStyle.color,
        backgroundColor: computedStyle.backgroundColor,
        fontSize: computedStyle.fontSize,
        fontWeight: computedStyle.fontWeight,
        margin: computedStyle.margin,
        padding: computedStyle.padding,
        border: computedStyle.border,
        borderRadius: computedStyle.borderRadius,
        textAlign: computedStyle.textAlign as 'left' | 'center' | 'right' | 'justify',
      }
    };
  };

  return (
    <div className="preview-wrapper">
      <PreviewToolbar 
        markdown={renderedHTML}
        customStyles={customStyles}
      />
      <div 
        className="preview-container preview-scope"
        ref={previewRef}
      >
        <div className="preview-content markdown-body" />
      </div>
      {isStylePanelOpen && selectedElement && (
        <StyleSelectorPanel
          elementStyle={getElementStyle(selectedElement)}
          onStyleChange={(style) => {
            if (onStyleSelect) {
              onStyleSelect(style);
            }
          }}
          onClose={() => {
            setIsStylePanelOpen(false);
            setSelectedElement(null);
          }}
          onApplyToCSSEditor={handleApplyToCSSEditor}
        />
      )}
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