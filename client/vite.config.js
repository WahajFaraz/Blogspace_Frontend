import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: ['fsevents'],
      output: {
        manualChunks: undefined,
      },
      onwarn(warning, warn) {
        // Ignore fsevents warnings
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT' && warning.source === 'fsevents') return;
        // Ignore other specific warnings if needed
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        // Use default for other warnings
        warn(warning);
      }
    },
  },
  define: {
    'process.env': {},
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify('https://blogspace-orpin.vercel.app'),
    'import.meta.env.DEV': JSON.stringify(false),
  },
  esbuild: {
    target: 'es2020',
    platform: 'browser',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
