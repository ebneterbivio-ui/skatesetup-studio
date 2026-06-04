import { useState, useEffect } from 'react'
import FormField from '../components/FormField.jsx'
import SetupCard from '../components/SetupCard.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { getSetups, saveSetup } from '../services/storageService.js'
import { EMPTY_SETUP_FORM, PURPOSE_OPTIONS, RATING_OPTIONS } from '../utils/skateConstants.js'
import './MySetups.css'

export default function MySetups() {
  const [setups, setSetups] = useState([])
  const [form, setForm] = useState(EMPTY_SETUP_FORM)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => { loadSetups() }, [])

  const loadSetups = async () => {
    try {
      const data = await getSetups()
      setSetups(data)
    } catch {
      setStatus({ type: 'error', text: 'Setups konnten nicht geladen werden.' })
    }
  }

  const handleDelete = (id) => {
    setSetups(prev => prev.filter(s => s.id !== id))
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      await saveSetup(form)
      setStatus({ type: 'success', text: 'Setup erfolgreich gespeichert!' })
      setForm(EMPTY_SETUP_FORM)
      await loadSetups()
    } catch {
      setStatus({ type: 'error', text: 'Fehler beim Speichern. Bitte erneut versuchen.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container my-setups-page">
      <h2 className="my-setups-page__title">Meine Setups</h2>
      <p className="my-setups-page__description">
        Dokumentiere deine gefahrenen Setups mit Bewertung und persönlichem Feedback.
      </p>
      <div className="my-setups-page__layout">
        <section className="my-setups-page__form-section">
          <h3 className="my-setups-page__section-title">Setup dokumentieren</h3>
          <form onSubmit={handleSubmit}>
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
            <FormField label="Bewertung">
              <select name="rating" value={form.rating} onChange={handleChange}>
                {RATING_OPTIONS.map(r => (
                  <option key={r} value={r}>{r} / 5</option>
                ))}
              </select>
            </FormField>
            <FormField label="Feedback">
              <textarea
                name="feedback"
                required
                value={form.feedback}
                onChange={handleChange}
                placeholder="Wie hat das Setup performt?"
              />
            </FormField>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Wird gespeichert…' : 'Setup speichern'}
            </button>
          </form>
          <StatusMessage type={status?.type} text={status?.text} />
        </section>

        <section className="my-setups-page__list-section">
          <h3 className="my-setups-page__section-title">
            Gespeicherte Setups ({setups.length})
          </h3>
          {setups.length === 0
            ? <p className="my-setups-page__empty">Noch keine Setups gespeichert.</p>
            : setups.map(s => (
                <SetupCard key={s.id} setup={s} onDelete={handleDelete} />
              ))
          }
        </section>
      </div>
    </div>
  )
}