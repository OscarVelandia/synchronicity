import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Served from the repo subpath on GitHub Pages (build); root during dev.
  base: command === 'build' ? '/synchronicity/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@app': fileURLToPath(new URL('./src/App.tsx', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@domain': fileURLToPath(new URL('./src/domain', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
