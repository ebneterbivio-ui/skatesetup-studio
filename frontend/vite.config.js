import { defineConfig } from 'vite' // Vite-Konfiguration importieren
import react from '@vitejs/plugin-react' // React-Plugin für Vite

export default defineConfig({
  plugins: [react()], // React-Support aktivieren
  server: {
    proxy: {
      // Proxy für Mail-Anfragen im lokalen Dev-Server
      '/api/mail': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mail/, '')
      },
      // Proxy für Storage-Anfragen im lokalen Dev-Server
      '/api/storage': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/storage/, '')
      }
    }
  }
})