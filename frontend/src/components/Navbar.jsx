import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="SkateSetup Studio Logo">
            <rect x="2" y="10" width="24" height="8" rx="4" fill="#f5c518"/>
            <circle cx="7" cy="21" r="3" fill="#f5c518"/>
            <circle cx="21" cy="21" r="3" fill="#f5c518"/>
            <rect x="6" y="8" width="16" height="3" rx="1.5" fill="rgba(255,255,255,0.3)"/>
          </svg>
          <span>SkateSetup Studio</span>
        </NavLink>
        <nav className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/plan" className={({ isActive }) => isActive ? 'active' : ''}>Setup planen</NavLink>
          <NavLink to="/setups" className={({ isActive }) => isActive ? 'active' : ''}>Meine Setups</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar