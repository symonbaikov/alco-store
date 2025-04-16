import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // делает доступным извне
    port: 5173,
    proxy: {
      '/api': 'http://backend:3001', // для общения с бэком
    },
  },
});