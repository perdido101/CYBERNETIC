import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/CYBERNETIC/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  define: {
    __API_KEY__: JSON.stringify('')
  }
}) 