# FamilyChoice Clinix - Code Structure Documentation

## Project Organization

The codebase has been refactored for better maintainability and clarity. All utility functions are now organized in separate modules.

---

## Utility Files

### 1. **src/utils/formHandler.js**
Handles all form-related logic and validation.

**Exported Functions:**
- `formatPhoneNumber(value)` - Formats phone input to (XXX) XXX-XXXX
- `validatePhoneNumber(phone)` - Validates 10-digit US phone number
- `validateEmail(email)` - Validates email format
- `validateFormData(formData)` - Comprehensive form validation with error messages
- `handleFormChange(e, formData, setFormData)` - Form input change handler with phone formatting

**Usage in App.jsx:**
```jsx
import { handleFormChange, validateFormData } from './utils/formHandler'

const handleFormInputChange = (e) => {
  handleFormChange(e, formData, setFormData)
}
```

---

### 2. **src/utils/emailService.js**
Manages email sending functionality via EmailJS.

**Exported Functions:**
- `sendAppointmentEmail(formData)` - Sends appointment request email
- `createEmailParams(formData)` - Prepares template parameters
- `getSuccessMessage(email)` - Returns success notification message
- `getFailureMessage()` - Returns fallback error message
- `getEmptyFormData()` - Returns empty form template

**Configuration Constants:**
- `EMAIL_SERVICE_ID` - EmailJS service ID
- `EMAIL_TEMPLATE_ID` - EmailJS template ID
- `ADMIN_EMAIL` - Recipient email address
- `CLINIC_PHONE` - Clinic phone number for fallback

**Usage in App.jsx:**
```jsx
import { sendAppointmentEmail, getSuccessMessage, getFailureMessage, getEmptyFormData } from './utils/emailService'

try {
  const result = await sendAppointmentEmail(formData)
  if (result.success) {
    alert(getSuccessMessage(formData.email))
    setFormData(getEmptyFormData())
  }
} catch (error) {
  alert(getFailureMessage())
}
```

---

### 3. **src/utils/navigationUtils.js**
Handles smooth scrolling and navigation between sections.

**Exported Functions:**
- `scrollToSection(ref, setMenuOpen)` - Scrolls to section and closes mobile menu
- `createNavHandler(ref, setMenuOpen)` - Returns a click handler for navigation

**Constants:**
- `NAVIGATION_SECTIONS` - List of available navigation sections

**Usage in App.jsx:**
```jsx
import { scrollToSection } from './utils/navigationUtils'

const handleScrollToSection = (ref) => {
  scrollToSection(ref, setMenuOpen)
}

// In JSX:
onClick={() => handleScrollToSection(heroRef)}
```

---

## Benefits of Refactoring

✅ **Separation of Concerns** - Each file handles a specific domain
✅ **Reusability** - Utility functions can be used across multiple components
✅ **Maintainability** - Easier to locate and update specific functionality
✅ **Testability** - Functions can be tested independently
✅ **Scalability** - Easy to add new utilities without cluttering main component
✅ **Clarity** - Code intent is immediately clear from file names and function names

---

## File Structure

```
src/
├── App.jsx                 (Main component - uses utility functions)
├── Logo.jsx               (Logo component)
├── App.css                (Styles)
├── assets/                (Images)
│   ├── banner.jpg
│   ├── physician.jpg
│   ├── young-doctor.jpg
│   └── logo-fc.png
├── utils/                 (NEW - Utility modules)
│   ├── formHandler.js     (Form validation & input handling)
│   ├── emailService.js    (Email sending via EmailJS)
│   └── navigationUtils.js (Scroll navigation)
└── index.html
```

---

## Import Summary

All imports in App.jsx are now clearly organized:

```jsx
// React & Libraries
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Components
import Logo from './Logo'

// Assets
import bannerImage from './assets/banner.jpg'
import physicianImage from './assets/physician.jpg'
import youngDoctorImage from './assets/young-doctor.jpg'

// Styles
import './App.css'

// Utilities
import { handleFormChange, validateFormData } from './utils/formHandler'
import { sendAppointmentEmail, getSuccessMessage, getFailureMessage, getEmptyFormData } from './utils/emailService'
import { scrollToSection } from './utils/navigationUtils'
```

---

## Future Enhancements

You can easily add more utility files as needed:
- `src/utils/constants.js` - App-wide constants
- `src/utils/animations.js` - Reusable Framer Motion animations
- `src/utils/seo.js` - SEO-related utilities
- `src/services/apiService.js` - API calls (when backend is added)

---

**Last Updated:** May 26, 2026
**Version:** 2.0 (Refactored with Utility Modules)
