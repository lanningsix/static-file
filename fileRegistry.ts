import { StaticFile } from './types'

// ==========================================
// 📂 文件清单 (File Registry)
// ==========================================
// 这是一个静态站点，浏览器无法自动扫描 public 文件夹。
// 使用步骤：
// 1. 将你的文件直接丢入项目的 'public' 文件夹 (或子文件夹)。
// 2. 在下方数组中添加文件信息。
// ==========================================

export const fileRegistry: StaticFile[] = [
  {
    name: 'up.mp3',
    path: '/audio/up.mp3', // 示例文件
    type: 'audio',
    size: '1 KB',
    date: '2025-11-21',
  },
  {
    name: 'fail.mp3',
    path: '/audio/fail.mp3', // 示例文件
    type: 'audio',
    size: '1 KB',
    date: '2025-11-21',
  },
  {
    name: 'unbelievable.mp3',
    path: '/audio/unbelievable.mp3', // 示例文件
    type: 'audio',
    size: '1 KB',
    date: '2025-11-21',
  },
  // 在这里添加更多文件...
  // {
  //   name: '公司介绍.pdf',
  //   path: '/docs/company.pdf',
  //   type: 'pdf',
  //   size: '4.2 MB'
  // }
]
