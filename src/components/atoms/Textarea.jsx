import { forwardRef } from 'react'

const Textarea = forwardRef(({ 
  label, 
  error, 
  hint,
  rows = 4,
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
      <textarea
        ref={ref}
        rows={rows}
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

Textarea.displayName = 'Textarea'

export default Textarea