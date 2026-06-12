import { useState } from 'react'
import FormInputField from '../components/FormInputField.jsx'
import FormSelectField from '../components/FormSelectField.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { sendSetupMail } from '../services/setupMailService.js'
import './PlanSetup.css'

const PURPOSE_OPTIONS = ['Street', 'Park', 'Bowl', 'Cruising']

const PlanSetup = () => {
  const [setupName, setSetupName] = useState('')
  const [deck, setDeck] = useState('')
  const [trucks, setTrucks] = useState('')
  const [wheels, setWheels] = useState('')
  const [bearings, setBearings] = useState('')
  const [purpose, setPurpose] = useState('Street')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const result = await sendSetupMail({ setupName, deck, trucks, wheels, bearings, purpose, recipientEmail })
      setStatus({ type: 'success', text: `Mail gesendet! Vorschau: ${result.previewUrl}` })
      setSetupName(''); setDeck(''); setTrucks(''); setWheels('')
      setBearings(''); setPurpose('Street'); setRecipientEmail('')
    } catch {
      setStatus({ type: 'error', text: 'Fehler beim Senden der Mail. Bitte erneut versuchen.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container plan-setup-page">
      <h2 className="plan-setup-page__title">Setup planen</h2>
      <p className="plan-setup-page__description">
        Stelle dein neues Board zusammen und schick dir die Konfiguration per Mail als Referenz.
      </p>
      <form className="plan-setup-page__form" onSubmit={handleSubmit}>
        <FormInputField label="Setup Name" name="setupName" value={setupName} onChange={e => setSetupName(e.target.value)} placeholder="z.B. Street Tech 8.0" required />
        <FormInputField label="Deck" name="deck" value={deck} onChange={e => setDeck(e.target.value)} placeholder="z.B. Chocolate 8.0" required />
        <FormInputField label="Achsen (Trucks)" name="trucks" value={trucks} onChange={e => setTrucks(e.target.value)} placeholder="z.B. Independent 139" required />
        <FormInputField label="Rollen (Wheels)" name="wheels" value={wheels} onChange={e => setWheels(e.target.value)} placeholder="z.B. Spitfire 52mm 99A" required />
        <FormInputField label="Bearings" name="bearings" value={bearings} onChange={e => setBearings(e.target.value)} placeholder="z.B. Bones Reds" required />
        <FormSelectField label="Einsatzzweck" name="purpose" value={purpose} onChange={e => setPurpose(e.target.value)} options={PURPOSE_OPTIONS} />
        <FormInputField label="Empfänger E-Mail" name="recipientEmail" type="email" value={recipientEmail} onChange={e => setRecipientEmail(e.target.value)} placeholder="deine@email.com" required />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Wird gesendet…' : 'Per Mail senden'}
        </button>
      </form>
      <StatusMessage type={status?.type} text={status?.text} />
    </div>
  )
}

export default PlanSetup