import { Link } from 'react-router-dom'
import './Home.css'

const FEATURE_CARDS = [
  {
    title: 'Setup planen',
    description: 'Stelle dein ideales Board zusammen und schick dir die Konfiguration per Mail — z.B. als Einkaufsliste.'
  },
  {
    title: 'Setups dokumentieren',
    description: 'Nach dem Fahren: Einsatzzweck, Bewertung und Feedback speichern. So weisst du, was wirklich funktioniert.'
  },
  {
    title: 'Setup-Logbuch',
    description: 'Alle gefahrenen Setups auf einen Blick — mit Bewertungen und persönlichem Feedback zur Performance.'
  }
]

export default function Home() {
  return (
    <div className="home-page">
      <div className="page-container home-page__intro">
        <h1 className="home-page__title">Willkommen bei SkateSetup Studio</h1>
        <p className="home-page__subtitle">
          Dein persönliches Logbuch für Skateboard-Setups.<br />
          Plane neue Kombinationen und dokumentiere gefahrene Setups.
        </p>
        <div className="home-page__actions">
          <Link to="/plan" className="btn btn-primary">Setup planen</Link>
          <Link to="/setups" className="btn btn-secondary">Meine Setups</Link>
        </div>
      </div>
      <div className="page-container home-page__features">
        {FEATURE_CARDS.map((card) => (
          <div key={card.title} className="feature-card">
            <h3 className="feature-card__title">{card.title}</h3>
            <p className="feature-card__description">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}