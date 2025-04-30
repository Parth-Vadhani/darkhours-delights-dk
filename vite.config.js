import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: ['firebase', 'firebase/app', 'firebase/auth', 'firebase/analytics'],
      output: {
        globals: {
          'firebase': 'firebase',
          'firebase/app': 'firebase',
          'firebase/auth': 'firebase.auth',
          'firebase/analytics': 'firebase.analytics'
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios']
  },
  resolve: {
    alias: {
      'firebase/app': 'firebase/app',
      'firebase/auth': 'firebase/auth',
      'firebase/analytics': 'firebase/analytics'
    }
  }
})
