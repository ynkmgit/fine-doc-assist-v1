import mermaid from 'mermaid';
import type { MermaidWorkerMessage } from '../services/mermaid/types';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'strict',
});

self.onmessage = async (e: MessageEvent<MermaidWorkerMessage>) => {
  const { id, code } = e.data;
  
  try {
    const { svg } = await mermaid.render(`mermaid-${id}`, code);
    self.postMessage({ success: true, svg });
  } catch (error) {
    self.postMessage({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    });
  }
};
