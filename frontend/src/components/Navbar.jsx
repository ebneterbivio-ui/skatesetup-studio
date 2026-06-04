import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/plan', label: 'Setup planen' },
  { to: '/setups', label: 'Meine Setups' }
]

function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="nav-bar">
      <div className="page-container nav-bar__inner">
        <Link to="/" className="nav-bar__logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect x="2" y="10" width="24" height="8" rx="4" fill="#f5c518"/>
            <circle cx="7" cy="21" r="3" fill="#f5c518"/>
            <circle cx="21" cy="21" r="3" fill="#f5c518"/>
            <rect x="6" y="8" width="16" height="3" rx="1.5" fill="rgba(255,255,255,0.3)"/>
          </svg>
          <span>SkateSetup Studio</span>
        </Link>
        <nav className="nav-bar__links">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={pathname === to
                ? 'nav-bar__link nav-bar__link--active'
                : 'nav-bar__link'}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar