import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteCompression from 'vite-plugin-compression';

const radixUIComponents = [
  '@radix-ui/react-avatar',
  '@radix-ui/react-label',
  '@radix-ui/react-select',
  '@radix-ui/react-slot'
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  
  // Set base URL for assets
  const base = isProduction ? '/' : '/';
  
  return {
    base: base,
    define: {
      'process.env': {},
      'import.meta.env': {
        ...env,
        VITE_API_BASE_URL: JSON.stringify(env.VITE_API_BASE_URL || 'https://blogs-backend-ebon.vercel.app/')
      }
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      // Disable compression in Vite config when building for Vercel
      // Vercel handles compression automatically
      process.env.VERCEL ? null : viteCompression({
        algorithm: 'brotli',
        ext: '.br',
        filter: (file) => !file.includes('assets/'),
      }),
      // Copy _redirects file to the output directory
      {
        name: 'copy-redirects',
        apply: 'build',
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: '_redirects',
            source: '/* /index.html 200'
          });
        }
      },
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      // Ensure consistent module resolution
      mainFields: ['module', 'jsnext:main', 'jsnext'],
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    },
    // Ensure proper handling of absolute imports
    publicDir: 'public',
    server: {
      port: 5173,
      proxy: !isProduction ? {
        '/api/v1': {
          target: 'https://blogspace-website-git-master-wahaj-farazs-projects.vercel.app/',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1')
        },
      } : undefined,
    },
    build: {
      outDir: 'dist',
      sourcemap: !isProduction,
      chunkSizeWarningLimit: 1000,
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
        esmExternals: true,
        requireReturnsDefault: 'auto'
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('@radix-ui')) {
                const pkg = id.split('node_modules/')[1].split('/').slice(0, 2).join('/');
                return pkg;
              }
              if (id.includes('framer-motion')) return 'framer';
              return 'vendor';
            }
          },
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
          // Ensure proper module resolution
          format: 'esm',
        },
      },
      minify: isProduction ? 'terser' : false,
      terserOptions: isProduction ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      } : undefined,
      modulePreload: false,
      dynamicImportVarsOptions: {
        exclude: []
      },
      // Disable brotli compression in Vite when building for Vercel
      brotliSize: !process.env.VERCEL,
    },
    optimizeDeps: {
      include: [
        ...radixUIComponents,
        'react',
        'react-dom',
        'react-router-dom',
        '@emotion/react',
        '@emotion/styled'
      ],
      esbuildOptions: {
        target: 'es2020',
      },
    },
  };
});
