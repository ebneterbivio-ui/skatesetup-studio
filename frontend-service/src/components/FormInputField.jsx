import './FormField.css'

const FormInputField = ({ label, name, value, onChange, placeholder, type = 'text', required = false }) => {
  return (
    <div className="form-field">
      <label className="form-field__label">{label}</label>
      <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} />
    </div>
  )
}

export default FormInputField