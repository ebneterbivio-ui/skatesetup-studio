import express from 'express' // Express-Webserver importieren
import cors from 'cors' // CORS aktivieren, damit Browser-Anfragen erlaubt sind
import nodemailer from 'nodemailer' // E-Mail Versand mit Nodemailer

const app = express() // Neue Express-Anwendung erzeugen
app.use(express.json()) // JSON-Request-Bodies parsen
app.use(cors()) // Cross-Origin Requests zulassen

const PORT = process.env.PORT || 3002 // Port des Mail-Services

app.post('/send', async (req, res) => {
  try {
    // Daten aus der Anfrage entnehmen
    const { setupName, deck, trucks, wheels, bearings, purpose, recipientEmail } = req.body

    const testAccount = await nodemailer.createTestAccount() // Ethereal-Testkonto erstellen
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email', // Ethereal SMTP-Server
      port: 587,
      secure: false, // TLS wird nicht automatisch verwendet
      auth: { user: testAccount.user, pass: testAccount.pass }
    })

    // Mail mit Setup-Daten zusammenstellen und senden
    const info = await transporter.sendMail({
      from: '"SkateSetup Studio" <noreply@skatesetup.studio>',
      to: recipientEmail,
      subject: `Dein neues Setup: ${setupName}`,
      text: [
        `Setup: ${setupName}`,
        `Deck: ${deck}`,
        `Achsen (Trucks): ${trucks}`,
        `Rollen (Wheels): ${wheels}`,
        `Bearings: ${bearings}`,
        `Einsatzzweck: ${purpose}`
      ].join('\n')
    })

    const previewUrl = nodemailer.getTestMessageUrl(info) // Vorschau-Link erzeugen
    console.log('Mail Preview:', previewUrl)
    res.json({ success: true, previewUrl }) // Erfolg mit Preview-Link zurückgeben
  } catch (err) {
    console.error('Mail Fehler:', err.message)
    res.status(500).json({ error: 'Mailversand fehlgeschlagen' })
  }
})

app.listen(PORT, () => console.log(`Mail Service läuft auf Port ${PORT}`)) // Mail-Service starten