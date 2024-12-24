export interface UseMermaidOptions {
  worker?: boolean;
  theme?: string;
  cache?: boolean;
}

export interface MermaidRenderState {
  svg: string;
  error: string | null;
  loading: boolean;
}
