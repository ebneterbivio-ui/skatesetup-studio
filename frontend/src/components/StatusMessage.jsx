import './StatusMessage.css' // Styles für Statusnachrichten importieren

// Zeigt eine Erfolg- oder Fehlermeldung an
function StatusMessage({ type, text }) {
  if (!text) return null // Wenn kein Text vorhanden ist, nichts rendern
  return (
    <p className={`status-message status-message--${type}`}>{text}</p>
  )
}

export default StatusMessage