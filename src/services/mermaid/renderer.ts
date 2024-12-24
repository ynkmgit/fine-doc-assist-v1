import mermaid from 'mermaid';

let initialized = false;

export const initializeMermaid = () => {
  if (initialized) return;
  
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'strict',
    fontSize: 16,
    sequence: {
      showSequenceNumbers: true,
      useMaxWidth: true
    },
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis'
    },
    gantt: {
      useMaxWidth: true
    }
  });
  
  initialized = true;
};

export const renderMermaid = async (id: string, code: string): Promise<{ svg: string }> => {
  if (!initialized) {
    initializeMermaid();
  }

  try {
    const cleanCode = code.trim().replace(/^\s+|\s+$/g, '');
    return await mermaid.render(`mermaid-${id}`, cleanCode);
  } catch (error) {
    console.error('Mermaid rendering error:', error);
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred during diagram rendering');
  }
};