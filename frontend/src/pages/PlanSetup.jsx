import './PlanSetup.css'

export default function PlanSetup() {
  return (
    <div className="container plan-page">
      <h2>Setup planen</h2>
      <p className="page-sub">
        Hier kannst du dein neues Skateboard-Setup zusammenstellen und dir die Konfiguration per Mail schicken lassen.
        <br /><span className="coming-badge">Coming soon — wird in Abgabe 2 umgesetzt</span>
      </p>
      <div className="preview-form">
        {['Setup Name','Deck','Achsen (Trucks)','Rollen (Wheels)','Bearings','Einsatzzweck','Empfänger-Mail'].map(label => (
          <div key={label} className="preview-field">
            <span>{label}</span>
            <div className="preview-input" />
          </div>
        ))}
        <button className="btn btn-primary" disabled>Per Mail senden</button>
      </div>
    </div>
  )
}