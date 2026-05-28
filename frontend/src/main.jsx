import React from 'react' // React-Bibliothek importieren
import ReactDOM from 'react-dom/client' // React-DOM-Renderer importieren
import App from './App.jsx' // Hauptkomponente der Anwendung importieren
import './styles/global.css' // globale CSS-Datei importieren

// React-Anwendung an das DOM anhängen
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)