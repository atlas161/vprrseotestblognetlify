import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        historyApiFallback: true
      },
      plugins: [
        react(),
        viteStaticCopy({
          targets: [
            {
              src: 'index.html',
              dest: '.'
            }
          ]
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          external: ['@types/leaflet'],
          output: {
            manualChunks: {
              // Vendor chunks
              'react-vendor': ['react', 'react-dom'],
              'framework-vendor': ['@headlessui/react', 'framer-motion'],
              'icons-vendor': ['lucide-react'],
              'maps-vendor': ['leaflet'],
              'video-vendor': ['@vimeo/player'],
              'utils-vendor': ['clsx']
            }
          }
        },
        chunkSizeWarningLimit: 1000
      }
    };
});
