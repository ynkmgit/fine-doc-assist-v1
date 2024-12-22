/**
 * 共通型定義
 */

// 基本型
export type ID = string;
export type Timestamp = number;

// ステータス
export type Status = 'idle' | 'loading' | 'success' | 'error';

// エラー
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

// サイズ
export interface Size {
  width: number;
  height: number;
}

// 位置
export interface Position {
  x: number;
  y: number;
}

// イベント
export interface AppEvent<T = unknown> {
  type: string;
  payload: T;
  timestamp: Timestamp;
}