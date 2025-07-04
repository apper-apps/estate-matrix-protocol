import { forwardRef } from 'react'

const Input = forwardRef(({ 
  type = 'text', 
  label, 
  error, 
  hint,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className={className}>
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`form-input ${error ? 'border-error focus:ring-error' : ''}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input