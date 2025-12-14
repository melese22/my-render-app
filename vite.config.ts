import { defineConfig } from 'vite'

export default defineConfig({
  // ... your existing config
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
    host: true,  // Important for Render
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    host: true,
  }
})