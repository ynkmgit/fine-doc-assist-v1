import { marked } from 'marked';
import DOMPurify from 'dompurify';
import TurndownService from 'turndown';

/**
 * マークダウンの拡張記法を処理するユーティリティ関数
 */
const processExtendedSyntax = (text: string) => {
  let content = text;
  let id = '';
  let classes: string[] = [];
  let otherAttrs: Record<string, string> = {};

  // 行末または強調テキスト後の属性指定を検出
  const attrMatch = content.match(/\s*\{([^}]+)\}\s*$/);
  if (attrMatch) {
    const attrStr = attrMatch[1];
    content = content.replace(attrMatch[0], '');

    // id属性の処理
    const idMatch = attrStr.match(/#([^\s}]+)/);
    if (idMatch) {
      id = idMatch[1];
    }

    // class属性の処理
    const classMatches = attrStr.match(/\.([^\s}]+)/g);
    if (classMatches) {
      classes = classMatches.map(match => match.substring(1));
    }

    // その他の属性の処理
    const otherAttrsMatches = attrStr.match(/([^#.\s}]+)=([^\s}]+)/g);
    if (otherAttrsMatches) {
      otherAttrsMatches.forEach(match => {
        const [key, value] = match.split('=');
        otherAttrs[key] = value.replace(/^["']|["']$/g, '');
      });
    }
  }

  return { content: content.trim(), id, classes, otherAttrs };
};

/**
 * HTML属性を文字列として生成
 */
const createAttributesString = (
  id: string,
  classes: string[],
  otherAttrs: Record<string, string>
): string => {
  const attrs: string[] = [];
  
  if (id) {
    attrs.push(`id="${id}"`);
  }
  
  if (classes.length > 0) {
    attrs.push(`class="${classes.join(' ')}"`);
  }
  
  Object.entries(otherAttrs).forEach(([key, value]) => {
    attrs.push(`${key}="${value}"`);
  });
  
  return attrs.length > 0 ? ' ' + attrs.join(' ') : '';
};

/**
 * marked.jsのカスタマイズ設定
 */
marked.use({
  headerIds: true,
  headerPrefix: '',
  renderer: {
    // 見出しのカスタマイズ
    heading(text: string, level: number): string {
      const { content, id, classes, otherAttrs } = processExtendedSyntax(text);
      const attrsString = createAttributesString(id, classes, otherAttrs);
      return `<h${level}${attrsString}>${content}</h${level}>`;
    },
    // 段落のカスタマイズ
    paragraph(text: string): string {
      const { content, id, classes, otherAttrs } = processExtendedSyntax(text);
      const attrsString = createAttributesString(id, classes, otherAttrs);
      return `<p${attrsString}>${content}</p>`;
    },
    // 強調（em）のカスタマイズ
    em(text: string): string {
      const { content, id, classes, otherAttrs } = processExtendedSyntax(text);
      const attrsString = createAttributesString(id, classes, otherAttrs);
      return `<em${attrsString}>${content}</em>`;
    },
    // コードブロックのカスタマイズ
    code(code: string, language: string | undefined): string {
      if (language === 'mermaid') {
        return `<div class="mermaid">${code}</div>`;
      }
      return `<pre><code class="language-${language}">${code}</code></pre>`;
    }
  }
});

/**
 * HTML→Markdown変換のためのTurndownカスタマイズ
 */
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

// HTMLからマークダウンへの変換時の属性文字列を生成
const getAttributesString = (node: HTMLElement): string => {
  const attrs: string[] = [];
  const id = node.getAttribute('id');
  const classes = node.getAttribute('class')?.split(' ').filter(Boolean) || [];
  
  if (id) {
    attrs.push(`#${id}`);
  }
  
  // mermaidクラスと言語指定クラスは除外
  classes.forEach(className => {
    if (className !== 'mermaid' && !className.startsWith('language-')) {
      attrs.push(`.${className}`);
    }
  });

  // style属性の処理
  const style = node.getAttribute('style');
  if (style) {
    attrs.push(`style=${style}`);
  }

  // lang属性の処理
  const lang = node.getAttribute('lang');
  if (lang) {
    attrs.push(`lang=${lang}`);
  }

  // その他の属性の処理（data-*属性など）
  Array.from(node.attributes).forEach(attr => {
    if (!['id', 'class', 'style', 'lang'].includes(attr.name) && !attr.name.startsWith('data-')) {
      attrs.push(`${attr.name}=${attr.value}`);
    }
  });
  
  return attrs.length > 0 ? ` {${attrs.join(' ')}}` : '';
};

// 見出しの変換ルール
turndownService.addRule('heading', {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  replacement: function (content: string, node: HTMLElement) {
    const level = Number(node.nodeName.charAt(1));
    const attributes = getAttributesString(node);
    return `\n${'#'.repeat(level)} ${content}${attributes}\n\n`;
  }
});

// 段落の変換ルール
turndownService.addRule('paragraph', {
  filter: 'p',
  replacement: function (content: string, node: HTMLElement) {
    const attributes = getAttributesString(node);
    if (attributes) {
      return `\n${content}\n${attributes}\n\n`;
    }
    return `\n${content}\n\n`;
  }
});

// 強調の変換ルール
turndownService.addRule('emphasis', {
  filter: ['em'],
  replacement: function (content: string, node: HTMLElement) {
    const attributes = getAttributesString(node);
    return `*${content}*${attributes}`;
  }
});

// マーメイド図の変換ルール
turndownService.addRule('mermaid', {
  filter: function (node: HTMLElement) {
    return node.nodeName === 'DIV' && node.className === 'mermaid';
  },
  replacement: function (content) {
    return `\n\`\`\`mermaid\n${content}\n\`\`\`\n`;
  }
});

// リストの変換ルール
turndownService.addRule('list', {
  filter: ['ul', 'ol'],
  replacement: function (content: string, node: HTMLElement) {
    const isOrdered = node.nodeName === 'OL';
    const listItems = content.trim().split('\n');
    const attributes = getAttributesString(node);
    
    const processedItems = listItems.map((item, index) => {
      if (isOrdered) {
        return `${index + 1}. ${item.trim()}`;
      }
      return `- ${item.trim()}`;
    }).join('\n');
    
    return `\n${processedItems}${attributes}\n\n`;
  }
});

/**
 * MarkdownからHTMLへの変換
 */
export const convertMarkdownToHtml = (markdown: string): string => {
  const html = marked(markdown);
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['id', 'class', 'style', 'lang'], // 許可する属性を追加
    ADD_TAGS: ['em'] // 許可するタグを追加
  });
};

/**
 * HTMLからMarkdownへの変換
 */
export const convertHtmlToMarkdown = (html: string): string => {
  const safeHtml = DOMPurify.sanitize(html, {
    ADD_ATTR: ['id', 'class', 'style', 'lang'], // 許可する属性を追加
    ADD_TAGS: ['em'] // 許可するタグを追加
  });
  return turndownService.turndown(safeHtml);
};

/**
 * 生のHTMLを安全に処理
 */
export const createSafeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['id', 'class', 'style', 'lang'], // 許可する属性を追加
    ADD_TAGS: ['em'] // 許可するタグを追加
  });
};