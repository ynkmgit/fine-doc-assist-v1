import { useState, useEffect } from 'react';
import { renderMermaid } from '../../services/mermaid/renderer';

interface UseMermaidResult {
  svg: string;
  error: string | null;
  loading: boolean;
}

export const useMermaid = (code: string): UseMermaidResult => {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!code.trim()) {
      setSvg('');
      setError(null);
      return;
    }

    let mounted = true;
    const renderDiagram = async () => {
      setLoading(true);
      try {
        const id = Math.random().toString(36).substr(2, 9);
        const renderedSvg = await renderMermaid(id, code);
        if (mounted) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram');
          setSvg('');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    renderDiagram();

    return () => {
      mounted = false;
    };
  }, [code]);

  return { svg, error, loading };
};

export default useMermaid;
