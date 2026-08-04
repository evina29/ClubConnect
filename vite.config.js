import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Local dev MUST use http://localhost:5173/Club-Connect/ (matches GitHub Pages).
export default defineConfig({
  base: '/Club-Connect/',
  plugins: [react()],
  server: {
    open: '/Club-Connect/',
  },
})
