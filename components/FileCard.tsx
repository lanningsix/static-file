import React from 'react';
import { StaticFile, ViewMode } from '../types';
import { getFileUrl } from '../utils';
import { 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Music, 
  Box, 
  FileCode, 
  Link2, 
  Download, 
  ExternalLink 
} from 'lucide-react';

interface FileCardProps {
  file: StaticFile;
  viewMode: ViewMode;
  onCopyLink: (url: string) => void;
}

export const FileCard: React.FC<FileCardProps> = ({ file, viewMode, onCopyLink }) => {
  const fullUrl = getFileUrl(file.path);

  const getIcon = () => {
    switch (file.type) {
      case 'image': return <ImageIcon className="text-purple-500 w-full h-full" />;
      case 'video': return <Film className="text-red-500 w-full h-full" />;
      case 'audio': return <Music className="text-amber-500 w-full h-full" />;
      case 'archive': return <Box className="text-orange-500 w-full h-full" />;
      case 'pdf': return <FileText className="text-red-600 w-full h-full" />;
      case 'code': return <FileCode className="text-blue-500 w-full h-full" />;
      default: return <FileText className="text-slate-400 w-full h-full" />;
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:shadow-sm transition-all hover:border-primary-300">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 p-2">
            {getIcon()}
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-slate-900 truncate pr-4" title={file.name}>
              {file.name}
            </h3>
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <span className="font-mono bg-slate-100 px-1.5 rounded text-slate-600">{file.path}</span>
              {file.size && <span>• {file.size}</span>}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
           <button 
            onClick={() => onCopyLink(fullUrl)}
            className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
            title="复制链接"
          >
            <Link2 className="w-4 h-4" />
          </button>
          <a 
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            title="在新标签页打开"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <a 
            href={fullUrl}
            download
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            title="下载"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="h-40 bg-slate-50 relative flex items-center justify-center overflow-hidden border-b border-slate-100">
        {file.type === 'image' ? (
          <img 
            src={fullUrl} 
            alt={file.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // 如果图片加载失败，回退到图标显示
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
            }}
          />
        ) : (
          <div className="w-16 h-16 transform transition-transform duration-300 group-hover:scale-110">
            {getIcon()}
          </div>
        )}
        
        {/* 图片加载失败时的回退显示 */}
        <div className="fallback-icon hidden absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16">{getIcon()}</div>
        </div>
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
          <button 
            onClick={() => onCopyLink(fullUrl)}
            className="bg-white text-slate-800 p-2 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-lg"
            title="复制链接"
          >
            <Link2 className="w-5 h-5" />
          </button>
          <a 
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-slate-800 p-2 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors shadow-lg"
            title="打开"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-slate-900 truncate" title={file.name}>{file.name}</h3>
        </div>
        <div className="flex items-center justify-between text-xs">
          <code className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded truncate max-w-[140px] block" title={file.path}>
            {file.path}
          </code>
          <span className="text-slate-400">{file.size || '-'}</span>
        </div>
      </div>
    </div>
  );
};