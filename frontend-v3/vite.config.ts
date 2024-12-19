import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/middleware': {
        // target: 'http://localhost:8080/api/v1',
        target: 'http://localhost:8080/api/v1',
        changeOrigin: true,
        secure: false
      }
    }
  },
})
