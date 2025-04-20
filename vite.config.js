import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000
  },
  // En vez de './', usar '/' 
  base: '/',
  build: {
    // Mejorar la configuración de construcción
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    // Asegurarse de que los archivos se procesen correctamente
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          dragndrop: ['react-beautiful-dnd']
        }
      }
    }
  }
});