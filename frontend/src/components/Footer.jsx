import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-brand">SkateSetup Studio</p>
        <p className="footer-copy">© {new Date().getFullYear()} — Dein persönliches Skate-Logbuch</p>
      </div>
    </footer>
  )
}

export default Footer