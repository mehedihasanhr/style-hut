import { useState } from 'react'

const Checkbox = ({ label, labelClassName, id, value, onChange, ...props }) => {
  const [checked, setChecked] = useState(false)
  const handleChange = (e) => {
    setChecked(e.target.checked)
    onChange && onChange(e)
  }
  return (
    <label htmlFor={id || label} className={`flex items-center gap-x-3 select-none ${labelClassName}`}>
      <input id={id || label} type="checkbox" checked={checked} value={value} onChange={handleChange} {...props} />
      <span>{label}</span>
    </label>
  )
}

export default Checkbox
