import { Status, AppError } from './common';

/**
 * ストア関連の共通型定義
 */

// ドキュメントストア
export interface DocumentState {
  content: string;
  html: string;
  status: Status;
  error: AppError | null;
  lastSaved: number;
}

// スタイルストア
export interface StyleState {
  styles: CSSProperties;
  selectedElement: string | null;
  history: CSSProperties[];
  status: Status;
}

// 画像ストア
export interface ImageState {
  images: ImageInfo[];
  uploadStatus: Status;
  error: AppError | null;
}

export interface ImageInfo {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  createdAt: number;
}

// マーメイドストア
export interface MermaidState {
  diagrams: MermaidDiagram[];
  renderStatus: Status;
  error: AppError | null;
}

export interface MermaidDiagram {
  id: string;
  code: string;
  svg: string | null;
  error: string | null;
}