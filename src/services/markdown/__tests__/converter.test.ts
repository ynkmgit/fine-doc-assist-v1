import { convertMarkdownToHtml, convertHtmlToMarkdown } from '../converter';

describe('Markdown Converter', () => {
  describe('convertMarkdownToHtml', () => {
    it('should handle basic markdown conversion', () => {
      const markdown = '# Hello World';
      const html = convertMarkdownToHtml(markdown);
      expect(html).toContain('<h1>Hello World</h1>');
    });

    it('should handle heading with ID', () => {
      const markdown = '# Hello World {#hello}';
      const html = convertMarkdownToHtml(markdown);
      expect(html).toContain('<h1 id="hello">Hello World</h1>');
    });

    it('should handle heading with single class', () => {
      const markdown = '# Hello World {.intro}';
      const html = convertMarkdownToHtml(markdown);
      expect(html).toContain('<h1 class="intro">Hello World</h1>');
    });

    it('should handle heading with multiple classes', () => {
      const markdown = '# Hello World {.intro .main}';
      const html = convertMarkdownToHtml(markdown);
      expect(html).toContain('<h1 class="intro main">Hello World</h1>');
    });

    it('should handle heading with both ID and class', () => {
      const markdown = '# Hello World {#hello} {.intro}';
      const html = convertMarkdownToHtml(markdown);
      expect(html).toContain('<h1 id="hello" class="intro">Hello World</h1>');
    });

    it('should handle paragraph with ID and class', () => {
      const markdown = 'Hello World {#hello} {.intro}';
      const html = convertMarkdownToHtml(markdown);
      expect(html).toContain('<p id="hello" class="intro">Hello World</p>');
    });

    it('should handle unordered list with class', () => {
      const markdown = '- Item 1\n- Item 2 {.highlight}';
      const html = convertMarkdownToHtml(markdown);
      expect(html).toContain('<ul');
      expect(html).toContain('Item 1');
      expect(html).toContain('Item 2');
      expect(html).toContain('highlight');
    });
  });

  describe('convertHtmlToMarkdown', () => {
    it('should handle basic HTML conversion', () => {
      const html = '<h1>Hello World</h1>';
      const markdown = convertHtmlToMarkdown(html);
      expect(markdown.trim()).toBe('# Hello World');
    });

    it('should preserve heading ID in conversion', () => {
      const html = '<h1 id="hello">Hello World</h1>';
      const markdown = convertHtmlToMarkdown(html);
      expect(markdown.trim()).toBe('# Hello World {#hello}');
    });

    it('should preserve single class in conversion', () => {
      const html = '<h1 class="intro">Hello World</h1>';
      const markdown = convertHtmlToMarkdown(html);
      expect(markdown.trim()).toBe('# Hello World {.intro}');
    });

    it('should preserve multiple classes in conversion', () => {
      const html = '<h1 class="intro main">Hello World</h1>';
      const markdown = convertHtmlToMarkdown(html);
      expect(markdown.trim()).toBe('# Hello World {.intro} {.main}');
    });

    it('should preserve both ID and classes in conversion', () => {
      const html = '<h1 id="hello" class="intro main">Hello World</h1>';
      const markdown = convertHtmlToMarkdown(html);
      expect(markdown.trim()).toBe('# Hello World {#hello} {.intro} {.main}');
    });

    it('should preserve paragraph ID and classes in conversion', () => {
      const html = '<p id="intro" class="lead highlight">Hello World</p>';
      const markdown = convertHtmlToMarkdown(html);
      expect(markdown.trim()).toBe('Hello World {#intro} {.lead} {.highlight}');
    });

    it('should handle mermaid diagrams correctly', () => {
      const html = '<div class="mermaid">graph TD;\nA-->B;</div>';
      const markdown = convertHtmlToMarkdown(html);
      expect(markdown.trim()).toBe('```mermaid\ngraph TD;\nA-->B;\n```');
    });

    it('should preserve list with class', () => {
      const html = '<ul class="checklist"><li>Item 1</li><li>Item 2</li></ul>';
      const markdown = convertHtmlToMarkdown(html);
      expect(markdown).toContain('- Item 1');
      expect(markdown).toContain('- Item 2');
      expect(markdown).toContain('{.checklist}');
    });

    it('should ignore language-specific classes in code blocks', () => {
      const html = '<pre><code class="language-javascript">const x = 1;</code></pre>';
      const markdown = convertHtmlToMarkdown(html);
      expect(markdown).toContain('```javascript');
      expect(markdown).not.toContain('{.language-javascript}');
    });
  });
});