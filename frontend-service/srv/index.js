import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

const PORT = process.env.PORT || 3000
const STORAGE_URL = process.env.STORAGE_SERVICE_URL || 'http://localhost:3001'
const MAIL_URL = process.env.MAIL_SERVICE_URL || 'http://localhost:3002'

app.use('/api/storage', createProxyMiddleware({
  target: STORAGE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/storage': '' }
}))

app.use('/api/mail', createProxyMiddleware({
  target: MAIL_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/mail': '' }
}))

app.use(express.static(path.join(__dirname, '../dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

app.listen(PORT, () => console.log(`Frontend Service läuft auf Port ${PORT}`))