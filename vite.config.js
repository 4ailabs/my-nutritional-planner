import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  // Asegurarse de que la ruta base esté configurada correctamente para Vercel
  base: './',
  build: {
    // Asegurarse de que los archivos estáticos se coloquen en la carpeta correcta
    outDir: 'dist',
    assetsDir: 'assets',
    // Generar source maps para mejor depuración
    sourcemap: true
  }
});