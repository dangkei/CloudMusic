import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ⚠️ base 必须和 GitHub 仓库名完全一致
export default defineConfig({
  base: '',
  plugins: [react()],
});
