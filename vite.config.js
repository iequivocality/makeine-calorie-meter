import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    allowedHosts: [
      '.csb.app'
    ]
  }
})