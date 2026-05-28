import './SetupCard.css' // Styles für die Setup-Karte importieren

// Component zur Darstellung eines einzelnen Setup-Eintrags
function SetupCard({ setup }) {
  return (
    <article className="setup-card">
      <h4 className="setup-card__title">{setup.setupname}</h4>
      <dl className="setup-card__details">
        <div className="setup-card__detail-row"><dt>Deck</dt><dd>{setup.deck}</dd></div>
        <div className="setup-card__detail-row"><dt>Trucks</dt><dd>{setup.trucks}</dd></div>
        <div className="setup-card__detail-row"><dt>Wheels</dt><dd>{setup.wheels}</dd></div>
        <div className="setup-card__detail-row"><dt>Bearings</dt><dd>{setup.bearings}</dd></div>
        <div className="setup-card__detail-row"><dt>Bewertung</dt><dd>{setup.rating} / 5</dd></div>
      </dl>
      {setup.feedback && (
        <p className="setup-card__feedback">{setup.feedback}</p>
      )}
    </article>
  )
}

export default SetupCard