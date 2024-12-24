import { marked } from 'marked';
import DOMPurify from 'dompurify';
import TurndownService from 'turndown';

// markedのカスタマイズ設定
marked.use({
  headerIds: true,
  headerPrefix: '',
  renderer: {
    heading(text: string, level: number): string {
      // ID指定のパターンにマッチ（スペースと{#id}の形式）
      const match = text.match(/^(.+?)\s+\{#([^}]+)\}$/);
      if (match) {
        const [, content, id] = match;
        return `<h${level} id="${id}">${content}</h${level}>`;
      }
      return `<h${level}>${text}</h${level}>`;
    }
  }
});

// Turndownのオプション設定
const turndownService = new TurndownService({
  headingStyle: 'atx',
  hr: '---',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  strongDelimiter: '**',
  linkStyle: 'inlined',
  linkReferenceStyle: 'full',
  blankReplacement: function(content, node) {
    return node.isBlock ? '\n\n' : '';
  }
});

// 見出しの変換ルール - IDを保持
turndownService.addRule('heading', {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  replacement: function (content, node) {
    const level = Number(node.nodeName.charAt(1));
    const id = node.getAttribute('id');
    const idPart = id ? ` {#${id}}` : '';
    return `\n${'#'.repeat(level)} ${content}${idPart}\n\n`;
  }
});

// リストの変換ルール
turndownService.addRule('list', {
  filter: ['ul', 'ol'],
  replacement: function (content, node) {
    const isOrdered = node.nodeName === 'OL';
    const listItems = content.trim().split('\n');
    const processedItems = listItems.map((item, index) => {
      if (isOrdered) {
        return `${index + 1}. ${item.trim()}`;
      }
      return `- ${item.trim()}`;
    }).join('\n');
    return `\n${processedItems}\n\n`;
  }
});

export const convertMarkdownToHtml = (markdown: string): string => {
  const html = marked(markdown);
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['id'] // DOMPurifyでidを許可
  });
};

export const convertHtmlToMarkdown = (html: string): string => {
  const safeHtml = DOMPurify.sanitize(html, {
    ADD_ATTR: ['id'] // DOMPurifyでidを許可
  });
  return turndownService.turndown(safeHtml);
};

export const createSafeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['id'] // DOMPurifyでidを許可
  });
};