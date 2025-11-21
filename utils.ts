import { FileType } from './types';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('复制失败:', err);
    return false;
  }
};

export const getFileUrl = (path: string): string => {
  // 移除开头的斜杠以避免双重斜杠，确保生成的 URL 是完整的绝对路径
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${window.location.origin}/${cleanPath}`;
};

// 根据文件名后缀自动推断类型
export const getFileTypeFromExtension = (filename: string): FileType => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'svg':
      return 'image';
    case 'mp4':
    case 'webm':
    case 'mov':
      return 'video';
    case 'mp3':
    case 'wav':
    case 'ogg':
      return 'audio';
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
      return 'archive';
    case 'pdf':
      return 'pdf';
    case 'js':
    case 'ts':
    case 'html':
    case 'css':
    case 'json':
    case 'txt':
    case 'md':
      return 'code';
    default:
      return 'other';
  }
};