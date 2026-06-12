import { useState, useEffect } from 'react'
import FormInputField from '../components/FormInputField.jsx'
import FormSelectField from '../components/FormSelectField.jsx'
import SetupCard from '../components/SetupCard.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { getSetups, saveSetup } from '../services/setupStorageService.js'
import './MySetups.css'

const PURPOSE_OPTIONS = ['Street', 'Park', 'Bowl', 'Cruising']
const RATING_OPTIONS = [
  { value: 1, label: '1 / 5' },
  { value: 2, label: '2 / 5' },
  { value: 3, label: '3 / 5' },
  { value: 4, label: '4 / 5' },
  { value: 5, label: '5 / 5' }
]

const MySetups = () => {
  const [setups, setSetups] = useState([])
  const [setupName, setSetupName] = useState('')
  const [deck, setDeck] = useState('')
  const [trucks, setTrucks] = useState('')
  const [wheels, setWheels] = useState('')
  const [bearings, setBearings] = useState('')
  const [purpose, setPurpose] = useState('Street')
  const [rating, setRating] = useState(5)
  const [feedback, setFeedback] = useState('')
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      await saveSetup({ setupName, deck, trucks, wheels, bearings, purpose, rating, feedback })
      setStatus({ type: 'success', text: 'Setup erfolgreich gespeichert!' })
      setSetupName(''); setDeck(''); setTrucks(''); setWheels('')
      setBearings(''); setPurpose('Street'); setRating(5); setFeedback('')
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
            <FormInputField label="Setup Name" name="setupName" value={setupName} onChange={e => setSetupName(e.target.value)} placeholder="z.B. Street Tech 8.0" required />
            <FormInputField label="Deck" name="deck" value={deck} onChange={e => setDeck(e.target.value)} placeholder="z.B. Chocolate 8.0" required />
            <FormInputField label="Achsen (Trucks)" name="trucks" value={trucks} onChange={e => setTrucks(e.target.value)} placeholder="z.B. Independent 139" required />
            <FormInputField label="Rollen (Wheels)" name="wheels" value={wheels} onChange={e => setWheels(e.target.value)} placeholder="z.B. Spitfire 52mm 99A" required />
            <FormInputField label="Bearings" name="bearings" value={bearings} onChange={e => setBearings(e.target.value)} placeholder="z.B. Bones Reds" required />
            <FormSelectField label="Einsatzzweck" name="purpose" value={purpose} onChange={e => setPurpose(e.target.value)} options={PURPOSE_OPTIONS} />
            <FormSelectField label="Bewertung" name="rating" value={rating} onChange={e => setRating(Number(e.target.value))} options={RATING_OPTIONS} />
            <div className="form-field">
              <label className="form-field__label">Feedback</label>
              <textarea name="feedback" required value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Wie hat das Setup performt?" />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Wird gespeichert…' : 'Setup speichern'}
            </button>
          </form>
          <StatusMessage type={status?.type} text={status?.text} />
        </section>
        <section className="my-setups-page__list-section">
          <h3 className="my-setups-page__section-title">Gespeicherte Setups ({setups.length})</h3>
          {setups.length === 0
            ? <p className="my-setups-page__empty">Noch keine Setups gespeichert.</p>
            : setups.map(s => <SetupCard key={s.id} setup={s} onDelete={handleDelete} />)
          }
        </section>
      </div>
    </div>
  )
}

export default MySetups