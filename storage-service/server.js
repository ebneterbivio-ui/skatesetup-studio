import express from 'express' // Express-Webserver importieren
import cors from 'cors' // CORS aktivieren, damit Browser-Anfragen erlaubt sind
import pkg from 'pg' // PostgreSQL-Client importieren

const { Pool } = pkg // Pool-Klasse aus pg nutzen
const app = express() // Neue Express-Anwendung erzeugen
app.use(express.json()) // JSON im Request-Body automatisch parsen
app.use(cors()) // Cross-Origin Requests zulassen

const PORT = process.env.PORT || 3001 // Port aus Umgebungsvariable oder Standard

const pool = new Pool({
  host: process.env.DB_HOST || 'db-service', // Datenbank-Host
  user: process.env.DB_USER || 'postgres', // Datenbank-Benutzer
  password: process.env.DB_PASSWORD || 'postgres', // Passwort
  database: process.env.DB_NAME || 'skatesetup', // Datenbankname
  port: process.env.DB_PORT || 5432 // Port der PostgreSQL-Datenbank
})

const initDB = async () => {
  try {
    // Tabelle erstellen, falls sie noch nicht existiert
    await pool.query(`
      CREATE TABLE IF NOT EXISTS setups (
        id        SERIAL PRIMARY KEY,
        setupname VARCHAR(255) NOT NULL,
        deck      VARCHAR(255) NOT NULL,
        trucks    VARCHAR(255) NOT NULL,
        wheels    VARCHAR(255) NOT NULL,
        bearings  VARCHAR(255) NOT NULL,
        purpose   VARCHAR(100) NOT NULL,
        rating    INT          NOT NULL,
        feedback  TEXT         NOT NULL
      );
    `)
    console.log('Datenbank initialisiert')
  } catch (err) {
    // Bei Fehlern erneut versuchen nach 5 Sekunden
    console.error('DB Init Fehler:', err.message)
    setTimeout(initDB, 5000)
  }
}

initDB() // Initialisierung beim Start ausführen

app.get('/setups', async (req, res) => {
  try {
    // Alle Setups aus der Datenbank lesen
    const result = await pool.query('SELECT * FROM setups ORDER BY id DESC')
    res.json(result.rows)
  } catch (err) {
    // Fehler an den Client senden
    res.status(500).json({ error: err.message })
  }
})

app.post('/setups', async (req, res) => {
  try {
    // Daten aus dem Request-Body entnehmen
    const { setupName, deck, trucks, wheels, bearings, purpose, rating, feedback } = req.body
    const result = await pool.query(
      `INSERT INTO setups (setupname, deck, trucks, wheels, bearings, purpose, rating, feedback)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [setupName, deck, trucks, wheels, bearings, purpose, rating, feedback]
    )
    // Das gespeicherte Setup als Antwort zurückgeben
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => console.log(`Storage Service läuft auf Port ${PORT}`)) // Server starten