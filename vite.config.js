import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import 'dotenv/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 5100,
    proxy: {
      '/api': {
        target: `${process.env.API_BASEURL}:${process.env.API_PORT}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
});