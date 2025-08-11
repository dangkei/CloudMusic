import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/CloudMusic/',
  build: {
    output: {
      assetFileNames: 'assets/[name]-[hash:4].[ext]',
      chunkFileNames: 'assets/[name]-[hash:4].js',
      entryFileNames: 'assets/[name]-[hash:4].js'
      }
    }
});
