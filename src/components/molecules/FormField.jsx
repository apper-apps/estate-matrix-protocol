import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Textarea from '@/components/atoms/Textarea'

const FormField = ({ 
  type = 'text', 
  label, 
  name, 
  value, 
  onChange, 
  error,
  hint,
  options = [],
  rows = 4,
  className = '',
  ...props 
}) => {
  const handleChange = (e) => {
    onChange(name, e.target.value)
  }

  const commonProps = {
    name,
    value,
    onChange: handleChange,
    error,
    hint,
    label,
    className,
    ...props
  }

  switch (type) {
    case 'select':
      return <Select options={options} {...commonProps} />
    case 'textarea':
      return <Textarea rows={rows} {...commonProps} />
    case 'number':
      return <Input type="number" {...commonProps} />
    case 'email':
      return <Input type="email" {...commonProps} />
    case 'tel':
      return <Input type="tel" {...commonProps} />
    default:
      return <Input type={type} {...commonProps} />
  }
}

export default FormField