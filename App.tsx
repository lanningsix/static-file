import React, { useState, useMemo } from 'react';
import { fileRegistry } from './fileRegistry';
import { FileCard } from './components/FileCard';
import { UploadZone as Instructions } from './components/UploadZone';
import { Toast } from './components/Toast';
import { ViewMode, ToastMessage } from './types';
import { generateId, copyToClipboard } from './utils';
import { 
  Search, 
  LayoutGrid, 
  List, 
  Package, 
  Terminal
} from 'lucide-react';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = generateId();
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleCopyLink = async (url: string) => {
    const success = await copyToClipboard(url);
    if (success) {
      addToast('success', '链接已复制到剪贴板！');
    } else {
      addToast('error', '复制链接失败');
    }
  };

  // 根据搜索词过滤文件
  const filteredFiles = useMemo(() => {
    return fileRegistry.filter(file => 
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.path.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans">
      {/* Toast 提示容器 */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-xs pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-2">
          {toasts.map(toast => (
            <Toast key={toast.id} toast={toast} onClose={removeToast} />
          ))}
        </div>
      </div>

      {/* 顶部导航栏 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-md">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                StaticBox
              </h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">静态文件服务</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-md border border-slate-200">
              <Terminal className="w-3 h-3 text-slate-400" />
              <span className="text-xs font-mono text-slate-600">npm run build</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* 说明区域 */}
        <Instructions />

        {/* 工具栏：搜索与视图切换 */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-2 rounded-xl border border-slate-200 shadow-sm sticky top-20 z-30">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索文件..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none text-slate-700 placeholder:text-slate-400 transition-all"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-end sm:self-auto">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="网格视图"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="列表视图"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 文件展示区 */}
        <div className="min-h-[300px]">
          {filteredFiles.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">未找到匹配的文件</p>
              <p className="text-slate-400 text-sm mt-1">请尝试不同的关键词，或在 fileRegistry.ts 中添加文件</p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" 
                : "flex flex-col gap-3"
            }>
              {filteredFiles.map((file, index) => (
                <FileCard 
                  key={index} 
                  file={file} 
                  viewMode={viewMode}
                  onCopyLink={handleCopyLink}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      {/* 页脚 */}
      <footer className="text-center py-8 text-slate-400 text-xs">
        <p>StaticBox &copy; {new Date().getFullYear()} - Public Directory File Explorer</p>
      </footer>
    </div>
  );
};

export default App;