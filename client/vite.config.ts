import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({

  server: {
    proxy: {
      // '/api': "https://naukari-backend-production.up.railway.app/"
      '/api': "http://localhost:5000/"
    },
    https: false,  // Ensure HTTPS is disabled
    host: '0.0.0.0',  // Bind to all interfaces for external access
    port: 5173,       // Port number
    open: true        // Optional: Automatically open browser
  },
  plugins: [react()],
})
