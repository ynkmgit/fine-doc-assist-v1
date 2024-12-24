import { marked } from 'marked';
import DOMPurify from 'dompurify';
import TurndownService from 'turndown';

/**
 * marked.jsのカスタマイズ設定
 * 以下の理由でカスタマイズが必要：
 * 1. マーメイド図: デフォルトでは<code class="language-mermaid">として出力されるが、
 *    マーメイドライブラリが要求する<div class="mermaid">形式に変換する必要がある
 * 2. ID指定: {#id}形式の拡張記法をHTML要素のid属性として適切に処理し、
 *    かつプレビューでは表示しない必要がある
 */
marked.use({
  headerIds: true,
  headerPrefix: '',
  renderer: {
    // 見出しのカスタマイズ - {#id}形式のID指定に対応
    heading(text: string, level: number): string {
      // {#id}形式のIDをキャプチャして要素のid属性として設定
      // プレビューには表示させないため、contentとidを分離
      const match = text.match(/^(.+?)\s+\{#([^}]+)\}$/);
      if (match) {
        const [, content, id] = match;
        return `<h${level} id="${id}">${content}</h${level}>`;
      }
      return `<h${level}>${text}</h${level}>`;
    },
    // コードブロックのカスタマイズ - マーメイド図の特別処理
    code(code: string, language: string | undefined): string {
      // マーメイド図は<div class="mermaid">形式で出力
      // これはマーメイドライブラリの要求する形式に合わせるため
      if (language === 'mermaid') {
        return `<div class="mermaid">${code}</div>`;
      }
      // その他の言語は通常のコードブロックとして処理
      return `<pre><code class="language-${language}">${code}</code></pre>`;
    }
  }
});

/**
 * HTML→Markdown変換のためのTurndownカスタマイズ
 * 以下の理由でカスタマイズが必要：
 * 1. ID属性の保持: HTML→Markdownの変換時にid属性を{#id}形式で保持
 * 2. マーメイド図の復元: <div class="mermaid">を```mermaid形式に正しく戻す
 * 3. 一貫性のある改行とスペース処理
 */
const turndownService = new TurndownService({
  headingStyle: 'atx',          // # 形式の見出し
  hr: '---',                    // 水平線
  bulletListMarker: '-',        // リストマーカー
  codeBlockStyle: 'fenced',     // ```形式のコードブロック
  emDelimiter: '*',             // *による強調
  strongDelimiter: '**',        // **による太字
  linkStyle: 'inlined',         // インラインリンク
  linkReferenceStyle: 'full',   // 完全な参照リンク
  blankReplacement: function(content, node) {
    return node.isBlock ? '\n\n' : '';  // ブロック要素の前後に適切な空行
  }
});

// 見出しの変換ルール - HTML要素のid属性を{#id}形式で保持
turndownService.addRule('heading', {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  replacement: function (content, node) {
    const level = Number(node.nodeName.charAt(1));
    const id = node.getAttribute('id');
    const idPart = id ? ` {#${id}}` : '';
    return `\n${'#'.repeat(level)} ${content}${idPart}\n\n`;
  }
});

// マーメイド図の変換ルール - <div class="mermaid">を```mermaid形式に変換
turndownService.addRule('mermaid', {
  filter: function (node) {
    return node.nodeName === 'DIV' && node.className === 'mermaid';
  },
  replacement: function (content) {
    return `\n\`\`\`mermaid\n${content}\n\`\`\`\n`;
  }
});

// リストの変換ルール - 一貫性のある形式を維持
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

/**
 * MarkdownからHTMLへの変換
 * DOMPurifyでXSS対策をしつつ、id属性は許可する
 */
export const convertMarkdownToHtml = (markdown: string): string => {
  const html = marked(markdown);
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['id'] // id属性は必要なので許可
  });
};

/**
 * HTMLからMarkdownへの変換
 * DOMPurifyでXSS対策をしつつ、id属性は許可する
 */
export const convertHtmlToMarkdown = (html: string): string => {
  const safeHtml = DOMPurify.sanitize(html, {
    ADD_ATTR: ['id'] // id属性は必要なので許可
  });
  return turndownService.turndown(safeHtml);
};

/**
 * 生のHTMLを安全に処理
 * id属性の許可が必要なケースに対応
 */
export const createSafeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['id'] // id属性は必要なので許可
  });
};