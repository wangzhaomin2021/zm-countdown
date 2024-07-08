import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/countdown.ts',
      name: 'countdown',
      fileName: (format) => `countdown.${format}.js`,
      formats: ['es']
    }
  }
})
