import { useState, useCallback } from 'react';
import { convertMarkdownToHtml, convertHtmlToMarkdown } from '../../services/markdown/converter';

export const useMarkdown = (initialMarkdown: string = '') => {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [html, setHtml] = useState(() => convertMarkdownToHtml(initialMarkdown));

  const updateMarkdown = useCallback((newMarkdown: string) => {
    setMarkdown(newMarkdown);
    const newHtml = convertMarkdownToHtml(newMarkdown);
    setHtml(newHtml);
  }, []);

  const updateHtml = useCallback((newHtml: string) => {
    setHtml(newHtml);
    const newMarkdown = convertHtmlToMarkdown(newHtml);
    setMarkdown(newMarkdown);
  }, []);

  return {
    markdown,
    html,
    updateMarkdown,
    updateHtml
  };
};