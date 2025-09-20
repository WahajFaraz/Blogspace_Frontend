import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  define: {
    'process.env': {},
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify('https://blogspace-orpin.vercel.app'),
    'import.meta.env.DEV': JSON.stringify(false),
  },
  esbuild: {
    target: 'es2020',
  },
});
