import { BrowserRouter, Routes, Route } from 'react-router-dom' // Router-Komponenten für Navigation
import Navbar from './components/Navbar.jsx' // Navigationsleiste importieren
import Footer from './components/Footer.jsx' // Footer importieren
import Home from './pages/Home.jsx' // Startseite importieren
import PlanSetup from './pages/PlanSetup.jsx' // Seite für Mail-Setup importieren
import MySetups from './pages/MySetups.jsx' // Seite zum Speichern von Setups importieren

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <main className="app-wrapper__content">
          <Routes>
            {/* Haupt-Routen der Anwendung definieren */}
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<PlanSetup />} />
            <Route path="/setups" element={<MySetups />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App // App-Komponente exportieren