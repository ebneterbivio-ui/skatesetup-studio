import './MySetups.css'

export default function MySetups() {
  return (
    <div className="container setups-page">
      <h2>Meine Setups</h2>
      <p className="page-sub">
        Hier dokumentierst du deine gefahrenen Setups mit Bewertung und Feedback.
        <br /><span className="coming-badge">Coming soon — wird in Abgabe 2 umgesetzt</span>
      </p>
      <div className="setups-layout">
        <div className="preview-form setups-form">
          <h3>Setup dokumentieren</h3>
          {['Setup Name','Deck','Trucks','Wheels','Bewertung','Feedback'].map(label => (
            <div key={label} className="preview-field">
              <span>{label}</span>
              <div className={`preview-input${label === 'Feedback' ? ' tall' : ''}`} />
            </div>
          ))}
          <button className="btn btn-primary" disabled>Speichern</button>
        </div>
        <div className="setups-list">
          <h3>Gespeicherte Setups</h3>
          {[1,2,3].map(i => (
            <div key={i} className="skeleton-card">
              <div className="skel skel-title" />
              <div className="skel-row"><div className="skel skel-field" /><div className="skel skel-field" /></div>
              <div className="skel skel-feedback" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}