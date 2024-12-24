import { marked } from 'marked';
import DOMPurify from 'dompurify';
import TurndownService from 'turndown';

// Turndownのオプション設定
const turndownService = new TurndownService({
  headingStyle: 'atx',           // # スタイルの見出し
  hr: '---',                     // 水平線
  bulletListMarker: '-',         // リストマーカー
  codeBlockStyle: 'fenced',      // コードブロック
  emDelimiter: '*',              // 強調
  strongDelimiter: '**',         // 太字
  linkStyle: 'inlined',          // インラインリンク
  linkReferenceStyle: 'full',    // 参照リンク
  blankReplacement: function(content, node) {
    return node.isBlock ? '\n\n' : '';
  }
});

// 見出しの変換ルールを強化
turndownService.addRule('heading', {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  replacement: function (content, node) {
    const level = Number(node.nodeName.charAt(1));
    return `\n${'#'.repeat(level)} ${content}\n\n`;
  }
});

// リストの変換ルールを強化
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
  return DOMPurify.sanitize(html);
};

export const convertHtmlToMarkdown = (html: string): string => {
  const safeHtml = DOMPurify.sanitize(html);
  return turndownService.turndown(safeHtml);
};

export const createSafeHtml = (html: string): string => {
  return DOMPurify.sanitize(html);
};