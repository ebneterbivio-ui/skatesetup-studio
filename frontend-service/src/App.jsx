import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import PlanSetup from './pages/PlanSetup.jsx'
import MySetups from './pages/MySetups.jsx'
import { ROUTES } from './routes.js'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <main className="app-wrapper__content">
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.PLAN} element={<PlanSetup />} />
            <Route path={ROUTES.SETUPS} element={<MySetups />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App