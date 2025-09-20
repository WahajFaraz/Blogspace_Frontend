import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Add any problematic Node.js core modules here
      'node:path': 'path-browserify',
      'path': 'path-browserify'
    },
    // Ensure .jsx and .tsx extensions are resolved
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    commonjsOptions: {
      include: [/node_modules/, /@rollup/],
      transformMixedEsModules: true,
      requireReturnsDefault: 'auto',
    },
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true,
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM'
        }
      },
      external: [
        'fsevents',
        'path',
        'node:path',
        'fs',
        'module',
        'crypto',
        'stream',
        'util',
        'buffer',
        'assert',
        'url',
        'http',
        'https',
        'os',
        'zlib',
        'tty',
        'constants'
      ],
      onwarn(warning, warn) {
        // Ignore specific warnings
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        if (warning.code === 'SOURCEMAP_ERROR') return;
        if (warning.message?.includes('node:path')) return;
        if (warning.message?.includes('Use of eval')) return;
        // Use default for other warnings
        warn(warning);
      }
    }
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
