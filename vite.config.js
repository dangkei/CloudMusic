import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


function getRepoBase() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8'));
    if (pkg.homepage) {
      const match = pkg.homepage.match(/github\.io\/([^/]+)/);
      if (match && match[1]) {
        return `/${match[1]}/`;
      }
    }
  } catch (e) {
    console.warn('⚠️ 无法从 package.json 中解析 homepage，将使用默认 /');
  }
  return '/';
}

export default defineConfig({
  plugins: [react()],
  base: getRepoBase(),
  build: {
    output: {
      assetFileNames: 'assets/[name]-[hash:4].[ext]',
      chunkFileNames: 'assets/[name]-[hash:4].js',
      entryFileNames: 'assets/[name]-[hash:4].js'
      }
    }
});
