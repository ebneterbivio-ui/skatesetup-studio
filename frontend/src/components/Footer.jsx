import './Footer.css' // Footer-Styles importieren

// Footer-Komponente zeigt Copyright-Informationen an
function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container site-footer__inner">
        <p className="site-footer__brand">SkateSetup Studio</p>
        <p className="site-footer__copy">© {new Date().getFullYear()} — Dein persönliches Skate-Logbuch</p>
      </div>
    </footer>
  )
}

export default Footer