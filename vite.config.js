import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'api-server-middleware',
      configureServer(server) {
        // Handle the /api/visit backend endpoint in development
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith('/api/visit')) {
            try {
              const { default: handler } = await import('./api/visit.js')
              // Polyfill Express/Vercel res helpers
              res.status = function(code) {
                this.statusCode = code
                return this
              }
              res.json = function(data) {
                this.setHeader('Content-Type', 'application/json')
                this.end(JSON.stringify(data))
                return this
              }
              await handler(req, res)
            } catch (err) {
              console.error('API Error:', err)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: err.message }))
            }
            return
          }
          next()
        })
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        homeIntro: resolve(__dirname, 'home-intro.html')
      }
    }
  }
})
