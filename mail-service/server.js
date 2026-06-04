import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3002

app.post('/send', async (req, res) => {
  try {
    const { setupName, deck, trucks, wheels, bearings, purpose, recipientEmail } = req.body

    const testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass }
    })

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

    const previewUrl = nodemailer.getTestMessageUrl(info)
    console.log('Mail Preview:', previewUrl)
    res.json({ success: true, previewUrl })
  } catch (err) {
    console.error('Mail Fehler:', err.message)
    res.status(500).json({ error: 'Mailversand fehlgeschlagen' })
  }
})

app.listen(PORT, () => console.log(`Mail Service läuft auf Port ${PORT}`))