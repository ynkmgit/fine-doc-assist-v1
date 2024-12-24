export interface MermaidRenderResult {
  svg: string;
  error?: string;
}

export interface MermaidWorkerMessage {
  id: string;
  code: string;
}

export interface MermaidWorkerResponse {
  success: boolean;
  svg?: string;
  error?: string;
}
