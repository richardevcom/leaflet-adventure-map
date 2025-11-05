import { defineConfig } from 'vite';
import { resolve } from 'path';
import json from '@rollup/plugin-json';

export default defineConfig({
  base: '/leaflet-adventure-map/',
  plugins: [json()],
  assetsInclude: ['**/*.geojson'],
  build: {
    minify: false,           // Keep code readable
    sourcemap: true,         // Generate source maps
    rollupOptions: {
      output: {
        format: 'es',        // ES modules
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          // Keep GeoJSON in root assets folder
          if (assetInfo.name?.endsWith('.geojson')) {
            return 'assets/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
