import { useState, useCallback } from 'react';
import { convertMarkdownToHtml } from '../../services/markdown/converter';

export const useMarkdown = (initialMarkdown: string = '') => {
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [html, setHtml] = useState('');

  const updateMarkdown = useCallback((newMarkdown: string) => {
    setMarkdown(newMarkdown);
    const newHtml = convertMarkdownToHtml(newMarkdown);
    setHtml(newHtml);
  }, []);

  return {
    markdown,
    html,
    updateMarkdown
  };
};