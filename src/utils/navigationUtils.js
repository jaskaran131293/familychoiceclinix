/**
 * Navigation Utilities
 * Handles smooth scrolling and navigation between sections
 */

/**
 * Scroll to a specific section with smooth animation
 * @param {React.MutableRefObject} ref - Reference to the section element
 * @param {function} setMenuOpen - State setter to close mobile menu
 */
export const scrollToSection = (ref, setMenuOpen) => {
  if (setMenuOpen) {
    setMenuOpen(false)
  }
  ref.current?.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Create a navigation handler for menu items
 * @param {React.MutableRefObject} ref - Reference to the target section
 * @param {function} setMenuOpen - State setter for mobile menu
 * @returns {function} Click handler function
 */
export const createNavHandler = (ref, setMenuOpen) => {
  return () => scrollToSection(ref, setMenuOpen)
}

/**
 * List of available navigation sections
 * Useful for dynamic menu generation
 */
export const NAVIGATION_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Services' },
  { id: 'testimonials', label: 'Testimonials' }
]
