import React from 'react';
import { FolderInput, Server } from 'lucide-react';

export const UploadZone: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Server className="w-5 h-5 text-primary-500" />
        如何添加新文件?
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-sm border border-blue-100">1</div>
          <div>
            <h4 className="font-medium text-slate-800 mb-1">放入 Public 目录</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              将你的资源（图片、PDF、压缩包等）直接放入项目的 <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono">public/</code> 文件夹中。
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold text-sm border border-blue-100">2</div>
          <div>
            <h4 className="font-medium text-slate-800 mb-1">更新清单 (Registry)</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              打开 <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono">src/fileRegistry.ts</code> 并添加对应的文件信息，页面刷新后即可看到。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};