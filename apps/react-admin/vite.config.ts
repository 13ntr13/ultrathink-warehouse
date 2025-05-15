import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@ultrathink/shared-ui': path.resolve(__dirname, '../../packages/shared-ui/src')
    }
  },
  server: {
    port: 3001,
    open: true
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true
  }
}) 