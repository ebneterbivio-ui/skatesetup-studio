import { useState } from 'react'
import FormField from '../components/FormField.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { sendMail } from '../services/mailService.js'
import { EMPTY_MAIL_FORM, PURPOSE_OPTIONS } from '../utils/skateConstants.js'
import './PlanSetup.css'

export default function PlanSetup() {
  const [form, setForm] = useState(EMPTY_MAIL_FORM) // Formularzustand initialisieren
  const [status, setStatus] = useState(null) // Statusmeldung für Erfolg/Fehler
  const [loading, setLoading] = useState(false) // Ladezustand für Submit-Button

  const handleChange = (e) => {
    // Werte aus Eingabefeldern in den Formzustand übernehmen
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // Standard-Formularverhalten verhindern
    setLoading(true) // Ladeanzeige aktivieren
    setStatus(null) // alte Statusmeldungen löschen
    try {
      const result = await sendMail(form) // Mail-Service aufrufen
      setStatus({ type: 'success', text: `Mail gesendet! Vorschau: ${result.previewUrl}` })
      setForm(EMPTY_MAIL_FORM) // Formular zurücksetzen
    } catch {
      setStatus({ type: 'error', text: 'Fehler beim Senden der Mail. Bitte erneut versuchen.' })
    } finally {
      setLoading(false) // Ladeanzeige deaktivieren
    }
  }

  return (
    <div className="page-container plan-setup-page">
      <h2 className="plan-setup-page__title">Setup planen</h2>
      <p className="plan-setup-page__description">
        Stelle dein neues Board zusammen und schick dir die Konfiguration per Mail als Referenz.
      </p>
      <form className="plan-setup-page__form" onSubmit={handleSubmit}>
        <FormField label="Setup Name">
          <input name="setupName" required value={form.setupName} onChange={handleChange} placeholder="z.B. Street Tech 8.0" />
        </FormField>
        <FormField label="Deck">
          <input name="deck" required value={form.deck} onChange={handleChange} placeholder="z.B. Chocolate 8.0" />
        </FormField>
        <FormField label="Achsen (Trucks)">
          <input name="trucks" required value={form.trucks} onChange={handleChange} placeholder="z.B. Independent 139" />
        </FormField>
        <FormField label="Rollen (Wheels)">
          <input name="wheels" required value={form.wheels} onChange={handleChange} placeholder="z.B. Spitfire 52mm 99A" />
        </FormField>
        <FormField label="Bearings">
          <input name="bearings" required value={form.bearings} onChange={handleChange} placeholder="z.B. Bones Reds" />
        </FormField>
        <FormField label="Einsatzzweck">
          <select name="purpose" value={form.purpose} onChange={handleChange}>
            {PURPOSE_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Empfänger E-Mail">
          <input name="recipientEmail" type="email" required value={form.recipientEmail} onChange={handleChange} placeholder="deine@email.com" />
        </FormField>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Wird gesendet…' : 'Per Mail senden'}
        </button>
      </form>
      <StatusMessage type={status?.type} text={status?.text} />
    </div>
  )
}