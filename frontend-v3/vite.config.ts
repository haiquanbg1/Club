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
        target: 'http://fall2024c8g7.int3306.freeddns.org',
        changeOrigin: true,
        secure: false
      }
    }
  },
})
