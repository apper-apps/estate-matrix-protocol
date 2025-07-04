export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0
}

export const validateMinLength = (value, minLength) => {
  return value && value.toString().trim().length >= minLength
}

export const validateMaxLength = (value, maxLength) => {
  return !value || value.toString().trim().length <= maxLength
}

export const validateNumber = (value) => {
  return !isNaN(value) && isFinite(value)
}

export const validatePositiveNumber = (value) => {
  return validateNumber(value) && parseFloat(value) > 0
}

export const validateUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}