import './StatusMessage.css'

function StatusMessage({ type, text }) {
  if (!text) return null
  return (
    <p className={`status-message status-message--${type}`}>{text}</p>
  )
}

export default StatusMessage