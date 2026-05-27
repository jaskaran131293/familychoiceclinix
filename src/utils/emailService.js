/**
 * Email Service
 * Handles sending appointment emails via EmailJS
 */
import emailjs from '@emailjs/browser'

// Initialize EmailJS
emailjs.init('ZWC7ghZ9zVK3J_HUN')

const EMAIL_SERVICE_ID = 'service_75bta95'
const EMAIL_TEMPLATE_ID = 'template_qep3du5'
const ADMIN_EMAIL = 'elitegill@gmail.com'
const CLINIC_PHONE = '(123) 456-7890'

/**
 * Create email template parameters
 * Prepares the data object for EmailJS
 * @param {object} formData - Form data containing appointment details
 * @returns {object} Template parameters for EmailJS
 */
export const createEmailParams = (formData) => {
  return {
    to_email: ADMIN_EMAIL,
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    appointment_date: formData.date,
    message: formData.message,
    reply_to: formData.email
  }
}

/**
 * Send appointment email
 * Sends appointment request via EmailJS
 * @param {object} formData - Form data with appointment details
 * @returns {Promise} Result of email send operation
 */
export const sendAppointmentEmail = async (formData) => {
  try {
    const templateParams = createEmailParams(formData)
    
    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams
    )

    return {
      success: response.status === 200,
      status: response.status,
      message: 'Email sent successfully'
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return {
      success: false,
      status: error.status,
      message: error.message
    }
  }
}

/**
 * Get success message for appointment
 * @param {string} email - User email
 * @returns {string} Success message
 */
export const getSuccessMessage = (email) => {
  return `✅ Appointment request sent successfully! We will contact you at ${email} shortly.`
}

/**
 * Get failure message for appointment
 * @returns {string} Fallback message
 */
export const getFailureMessage = () => {
  return `⚠️ We received your appointment request but email confirmation failed. Please call ${CLINIC_PHONE} to confirm.`
}

/**
 * Get empty form data template
 * @returns {object} Empty form data object
 */
export const getEmptyFormData = () => {
  return {
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  }
}
