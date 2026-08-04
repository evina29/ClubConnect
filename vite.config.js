import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Relative base ('./') so the built app works no matter what the GitHub Pages
// repo/subpath is named. The app uses HashRouter, so deep links work too.
export default defineConfig({
  base: './',
  plugins: [react()],
})
