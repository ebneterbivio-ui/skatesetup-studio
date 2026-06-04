import './SetupCard.css'
import { deleteSetup } from '../services/storageService.js'

function SetupCard({ setup, onDelete }) {
  const handleDelete = async () => {
    if (!window.confirm(`Setup "${setup.setupname}" wirklich löschen?`)) return
    try {
      await deleteSetup(setup.id)
      onDelete(setup.id)
    } catch {
      alert('Fehler beim Löschen.')
    }
  }

  return (
    <article className="setup-card">
      <div className="setup-card__header">
        <h4 className="setup-card__title">{setup.setupname}</h4>
        <button className="setup-card__delete" onClick={handleDelete} title="Löschen">
          ✕
        </button>
      </div>
      <dl className="setup-card__details">
        <div className="setup-card__detail-row">
          <dt>Deck</dt><dd>{setup.deck}</dd>
        </div>
        <div className="setup-card__detail-row">
          <dt>Trucks</dt><dd>{setup.trucks}</dd>
        </div>
        <div className="setup-card__detail-row">
          <dt>Wheels</dt><dd>{setup.wheels}</dd>
        </div>
        <div className="setup-card__detail-row">
          <dt>Bearings</dt><dd>{setup.bearings}</dd>
        </div>
        <div className="setup-card__detail-row">
          <dt>Zweck</dt><dd>{setup.purpose}</dd>
        </div>
        <div className="setup-card__detail-row">
          <dt>Bewertung</dt><dd>{setup.rating} / 5</dd>
        </div>
      </dl>
      {setup.feedback && (
        <p className="setup-card__feedback">{setup.feedback}</p>
      )}
    </article>
  )
}

export default SetupCard