import express from 'express'
import cors from 'cors'
import pkg from 'pg'

const { Pool } = pkg
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3001

const pool = new Pool({
  host: process.env.DB_HOST || 'db-service',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'skatesetup',
  port: process.env.DB_PORT || 5432
})

const initDB = async () => {
  try {
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
    console.error('DB Init Fehler:', err.message)
    setTimeout(initDB, 5000)
  }
}

initDB()

app.get('/setups', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM setups ORDER BY id DESC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/setups', async (req, res) => {
  try {
    const { setupName, deck, trucks, wheels, bearings, purpose, rating, feedback } = req.body
    const result = await pool.query(
      `INSERT INTO setups (setupname, deck, trucks, wheels, bearings, purpose, rating, feedback)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [setupName, deck, trucks, wheels, bearings, purpose, rating, feedback]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.delete('/setups/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM setups WHERE id = $1', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => console.log(`Storage Service läuft auf Port ${PORT}`))