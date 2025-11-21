export type FileType = 'image' | 'video' | 'audio' | 'archive' | 'pdf' | 'code' | 'other';

export interface StaticFile {
  name: string;
  path: string; // 相对于 public 的路径，例如 '/assets/logo.png'
  size?: string; // 手动填写的字符串，例如 '2.5 MB'
  type: FileType;
  date?: string; // 上传日期
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export type ViewMode = 'grid' | 'list';