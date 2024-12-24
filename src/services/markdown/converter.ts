import { marked } from 'marked';
import DOMPurify from 'dompurify';

export const convertMarkdownToHtml = (markdown: string): string => {
  const html = marked(markdown);
  return DOMPurify.sanitize(html);
};

export const createSafeHtml = (html: string): string => {
  return DOMPurify.sanitize(html);
};