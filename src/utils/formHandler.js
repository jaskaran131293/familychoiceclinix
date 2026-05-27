/**
 * Form Handler Utilities
 * Handles form input changes and validation
 */

/**
 * Format phone number as user types
 * Converts input to (XXX) XXX-XXXX format
 * @param {string} value - Raw phone input
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, '')
  const limited = cleaned.slice(0, 10)
  
  if (limited.length === 0) return ''
  if (limited.length <= 3) return limited
  if (limited.length <= 6) return `(${limited.slice(0, 3)}) ${limited.slice(3)}`
  return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`
}

/**
 * Validate phone number
 * Ensures phone has exactly 10 digits
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const validatePhoneNumber = (phone) => {
  const phoneDigits = phone.replace(/\D/g, '')
  return phoneDigits.length === 10
}

/**
 * Validate email address
 * Basic email format validation
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate form data
 * Checks all required fields
 * @param {object} formData - Form data object
 * @returns {object} { isValid: boolean, error: string }
 */
export const validateFormData = (formData) => {
  if (!formData.name.trim()) {
    return { isValid: false, error: 'Please enter your name.' }
  }
  if (!formData.email.trim()) {
    return { isValid: false, error: 'Please enter your email.' }
  }
  if (!validateEmail(formData.email)) {
    return { isValid: false, error: 'Please enter a valid email address.' }
  }
  if (!validatePhoneNumber(formData.phone)) {
    return { isValid: false, error: '⚠️ Please enter a valid 10-digit US phone number.' }
  }
  if (!formData.date) {
    return { isValid: false, error: 'Please select an appointment date.' }
  }
  
  return { isValid: true, error: '' }
}

/**
 * Handle form input changes with phone formatting
 * @param {Event} e - Input change event
 * @param {object} formData - Current form data
 * @param {function} setFormData - State setter for form data
 */
export const handleFormChange = (e, formData, setFormData) => {
  const { name, value } = e.target

  if (name === 'phone') {
    const formatted = formatPhoneNumber(value)
    setFormData(prev => ({
      ...prev,
      [name]: formatted
    }))
    return
  }

  setFormData(prev => ({
    ...prev,
    [name]: value
  }))
}
