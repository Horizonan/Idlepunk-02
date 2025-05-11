import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'cb9b14e4-0b00-4cc2-8434-4986bfa5356b-00-17ta6igptpd0e.kirk.replit.dev'
    ],
    open: false
  }
});