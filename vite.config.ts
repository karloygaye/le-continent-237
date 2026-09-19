import { defineConfig } from 'vite'
import { conciergePlugin } from './server/concierge.ts'

export default defineConfig({
  plugins: [conciergePlugin()],
  server: {
    host: true,
    port: 43141,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 43141,
    strictPort: true,
    allowedHosts: true,
  },
})
