import './FormField.css' // Styles für Formularfelder importieren

// Wrapper-Komponente für ein Formularfeld mit Beschriftung
function FormField({ label, children }) {
  return (
    <div className="form-field">
      <label className="form-field__label">{label}</label>
      {children}
    </div>
  )
}

export default FormField