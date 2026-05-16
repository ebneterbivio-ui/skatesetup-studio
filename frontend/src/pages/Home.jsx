import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <div className="container home-hero">
        <h1>Willkommen bei SkateSetup Studio</h1>
        <p className="home-sub">
          Dein persönliches Logbuch für Skateboard-Setups.
          Plane neue Kombinationen und dokumentiere gefahrene Setups.
        </p>
        <div className="home-actions">
          <Link to="/plan" className="btn btn-primary">Setup planen</Link>
          <Link to="/setups" className="btn btn-secondary">Meine Setups</Link>
        </div>
      </div>
      <div className="container home-cards">
        <div className="home-card">
          <h3>Setup planen</h3>
          <p>Stelle dein ideales Board zusammen und schick dir die Konfiguration per Mail.</p>
        </div>
        <div className="home-card">
          <h3>Setups dokumentieren</h3>
          <p>Nach dem Fahren: Einsatzzweck, Bewertung und Feedback speichern.</p>
        </div>
        <div className="home-card">
          <h3>Setup-Logbuch</h3>
          <p>Alle gefahrenen Setups auf einen Blick — mit Bewertungen und Feedback.</p>
        </div>
      </div>
    </div>
  )
}