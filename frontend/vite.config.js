import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Group lodash into a separate chunk
          lodash: ["lodash"],
          // Group react and react-dom into a separate chunk
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
