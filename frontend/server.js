import express from 'express' // Express-Webserver importieren
import { createProxyMiddleware } from 'http-proxy-middleware' // Proxy für API-Aufrufe
import path from 'path' // Pfadfunktionen nutzen
import { fileURLToPath } from 'url' // __dirname verfügbar machen

const __dirname = path.dirname(fileURLToPath(import.meta.url)) // Aktuelles Verzeichnis finden
const app = express() // Express-Anwendung erzeugen

const PORT = process.env.PORT || 3000 // Port für den Frontend-Server
const STORAGE_URL = process.env.STORAGE_SERVICE_URL || 'http://localhost:3001' // Storage-Service-Adresse
const MAIL_URL = process.env.MAIL_SERVICE_URL || 'http://localhost:3002' // Mail-Service-Adresse

// Proxy-Regel für Storage-Endpunkte
app.use('/api/storage', createProxyMiddleware({
  target: STORAGE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/storage': '' }
}))

// Proxy-Regel für Mail-Endpunkte
app.use('/api/mail', createProxyMiddleware({
  target: MAIL_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/mail': '' }
}))

// Statische Dateien aus dem Build-Ordner bedienen
app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => console.log(`Frontend server running on port ${PORT}`)) // Server starten