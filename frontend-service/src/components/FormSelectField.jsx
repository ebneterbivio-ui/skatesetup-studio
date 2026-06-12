import './FormField.css'

const FormSelectField = ({ label, name, value, onChange, options }) => {
  return (
    <div className="form-field">
      <label className="form-field__label">{label}</label>
      <select name={name} value={value} onChange={onChange}>
        {options.map(opt => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FormSelectField