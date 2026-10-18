import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // site custom domain root par chalegi
  server: {
    proxy: { '/api': 'http://localhost:5000' },
  },
})