import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/100-Rules-Jacque-Fresco-Would-Suggest-We-Follow/' : '/',
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://backend:3000'
    }
  },
  preview: {
    port: 3000
  }
});
