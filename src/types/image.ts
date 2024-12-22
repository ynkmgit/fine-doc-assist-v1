import { Status, Size, AppError } from './common';

/**
 * 画像管理関連の型定義
 */

// 画像情報
export interface ImageInfo {
  id: string;
  file: File;
  url: string;
  thumbnail: string;
  name: string;
  size: number;
  type: string;
  dimensions: Size;
  createdAt: number;
}

// アップロード設定
export interface UploadConfig {
  maxSize: number;
  acceptedTypes: string[];
  generateThumbnail: boolean;
  thumbnailSize: Size;
}

// アップロードの状態
export interface UploadState {
  status: Status;
  progress: number;
  error: AppError | null;
}

// 画像処理オプション
export interface ImageProcessOptions {
  resize?: Size;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  preserveMetadata?: boolean;
}

// 画像ギャラリー設定
export interface GalleryConfig {
  layout: 'grid' | 'list';
  sortBy: 'name' | 'date' | 'size';
  itemsPerPage: number;
  showDetails: boolean;
}

// 画像選択イベント
export interface ImageSelectEvent {
  image: ImageInfo;
  insertAt?: Position;
}