/**
 * Notification Service
 * Handles beautiful toast notifications using Sonner
 */
import { toast } from 'sonner'

/**
 * Show success toast notification
 * @param {string} message - Success message to display
 * @param {string} description - Optional detailed description
 */
export const showSuccessToast = (message, description = '') => {
  toast.success(message, {
    description: description || undefined,
    duration: 5000
  })
}

/**
 * Show error toast notification
 * @param {string} message - Error message to display
 * @param {string} description - Optional detailed description
 */
export const showErrorToast = (message, description = '') => {
  toast.error(message, {
    description: description || undefined,
    duration: 5000
  })
}

/**
 * Show info toast notification
 * @param {string} message - Info message to display
 * @param {string} description - Optional detailed description
 */
export const showInfoToast = (message, description = '') => {
  toast.info(message, {
    description: description || undefined,
    duration: 4000
  })
}

/**
 * Show warning toast notification
 * @param {string} message - Warning message to display
 * @param {string} description - Optional detailed description
 */
export const showWarningToast = (message, description = '') => {
  toast.warning(message, {
    description: description || undefined,
    duration: 4000
  })
}

/**
 * Show loading toast notification (returns promise)
 * @param {string} message - Loading message to display
 * @returns {function} Function to resolve/reject the loading toast
 */
export const showLoadingToast = (message) => {
  const toastId = toast.loading(message)
  
  return {
    success: (successMessage) => toast.success(successMessage, { id: toastId }),
    error: (errorMessage) => toast.error(errorMessage, { id: toastId })
  }
}

/**
 * Show appointment success notification
 * @param {string} email - User's email
 */
export const showAppointmentSuccess = (email) => {
  showSuccessToast('Appointment Request Sent!', `We will contact you at ${email} shortly.`)
}

/**
 * Show appointment error notification
 * @param {string} phone - Clinic phone number
 */
export const showAppointmentError = (phone) => {
  showErrorToast(
    'Email Confirmation Failed',
    `Please call ${phone} to confirm your appointment.`
  )
}

/**
 * Show validation error notification
 * @param {string} errorMessage - Validation error message
 */
export const showValidationError = (errorMessage) => {
  showWarningToast('Validation Error', errorMessage)
}
