import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'discover-feeds': [
            './src/components/discover/RecommendationsFeed.tsx',
            './src/components/discover/TrendingBrandsFeed.tsx',
            './src/components/discover/JustAddedFeed.tsx'
          ]
        }
      }
    }
  }
});
