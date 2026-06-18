import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'
import Logo from './Logo'
import Modal from './components/Modal'
import bannerImage from './assets/banner.jpg'
import physicianImage from './assets/physician.jpg'
import youngDoctorImage from './assets/young-doctor.jpg'
import './App.css'

// Utility imports
import { handleFormChange, validateFormData } from './utils/formHandler'
import { sendAppointmentEmail, getSuccessMessage, getFailureMessage, getEmptyFormData } from './utils/emailService'
import { scrollToSection } from './utils/navigationUtils'
import { showValidationError, showAppointmentSuccess, showAppointmentError } from './utils/notificationService'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeModal, setActiveModal] = useState(null) // 'privacy', 'terms', 'contact', 'video', or null

  // Create refs for each section
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const testimonialRef = useRef(null)
  const appointmentRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  })
  const [formSubmitting, setFormSubmitting] = useState(false)

  // SEO optimization - Add meta tags dynamically
  useEffect(() => {
    document.title = 'FamilyChoice Clinix - Premium Medical Healthcare Services'
    const descMeta = document.querySelector('meta[name="description"]')
    if (descMeta) descMeta.setAttribute('content', 'Premium family healthcare clinic with 25+ expert doctors. Offering general checkups, pediatrics, and specialized medical services. 24/7 emergency support.')
  }, [])

  // Form change handler wrapper
  const handleFormInputChange = (e) => {
    handleFormChange(e, formData, setFormData)
  }

  // Navigation handler wrapper
  const handleScrollToSection = (ref) => {
    scrollToSection(ref, setMenuOpen)
  }

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    // Validate form data
    const validation = validateFormData(formData)
    if (!validation.isValid) {
      showValidationError(validation.error)
      return
    }

    setFormSubmitting(true)

    try {
      const result = await sendAppointmentEmail(formData)

      if (result.success) {
        showAppointmentSuccess(formData.email)
        setFormData(getEmptyFormData())
      } else {
        showAppointmentError(formData.phone)
      }
    } catch (error) {
      console.error('Error in form submission:', error)
      showAppointmentError(formData.phone)
    }

    setFormSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <Toaster position="top-right" richColors />
      {/* TOP BAR */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900 text-white px-4 sm:px-6 lg:px-16 py-2 sm:py-3 flex flex-col sm:flex-row justify-between items-center sm:items-center gap-3 sm:gap-0 text-xs sm:text-sm"
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 w-full sm:w-auto">
          <a href="tel:832-577-5875" className="truncate hover:text-brand transition">📞 (832)-577-5875</a>
          <span className="truncate hidden sm:inline">📧 Email Us: hello@familychoice.com</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-1 align-center">
          <span className="text-gray-400 text-xs">Follow:</span>
          <a href="#" className="text-blue-400 hover:text-brand transition flex items-center justify-center">f</a>
          <a href="#" className="text-blue-400 hover:text-brand transition flex items-center justify-center">𝕏</a>
          <a href="#" className="text-blue-400 hover:text-brand transition flex items-center justify-center">✈️</a>
        </div>
      </motion.div>

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-lg"
      >
        <div className="w-full px-4 sm:px-6 lg:px-16 py-3 sm:py-3 flex items-center justify-between max-w-[1720px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Logo className="w-48 h-48 sm:w-56 lg:w-64" />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-8 xl:gap-10 text-gray-800 font-medium text-lg">
            <motion.li
              whileHover={{ color: '#27B4C8', scale: 1.05 }}
              onClick={() => handleScrollToSection(heroRef)}
              className="cursor-pointer transition-colors"
            >
              Home
            </motion.li>
            <motion.li
              whileHover={{ color: '#27B4C8', scale: 1.05 }}
              onClick={() => handleScrollToSection(aboutRef)}
              className="cursor-pointer transition-colors"
            >
              About Us
            </motion.li>
            <motion.li
              whileHover={{ color: '#27B4C8', scale: 1.05 }}
              onClick={() => handleScrollToSection(servicesRef)}
              className="cursor-pointer transition-colors"
            >
              Services
            </motion.li>
            <motion.li
              whileHover={{ color: '#27B4C8', scale: 1.05 }}
              onClick={() => handleScrollToSection(testimonialRef)}
              className="cursor-pointer transition-colors"
            >
              Testimonials
            </motion.li>
          </ul>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleScrollToSection(appointmentRef)}
            className="hidden lg:block bg-white border-2 border-brand text-brand px-6 lg:px-8 py-2 lg:py-2.5 rounded-full font-bold text-sm hover:bg-brand hover:text-white transition-all"
          >
            Contact Us
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block h-0.5 w-6 bg-black transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-black transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-black transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 px-6 py-4"
          >
            <ul className="flex flex-col gap-4">
              <li onClick={() => handleScrollToSection(heroRef)} className="cursor-pointer text-gray-800 hover:text-brand transition-colors">Home</li>
              <li onClick={() => handleScrollToSection(aboutRef)} className="cursor-pointer text-gray-800 hover:text-brand transition-colors">About Us</li>
              <li onClick={() => handleScrollToSection(servicesRef)} className="cursor-pointer text-gray-800 hover:text-brand transition-colors">Services</li>
              <li onClick={() => handleScrollToSection(testimonialRef)} className="cursor-pointer text-gray-800 hover:text-brand transition-colors">Testimonials</li>
              <li onClick={() => handleScrollToSection(appointmentRef)} className="cursor-pointer text-gray-800 hover:text-brand transition-colors">Contact</li>
              <button onClick={() => handleScrollToSection(appointmentRef)} className="mt-4 w-full bg-brand text-white py-2.5 rounded-full font-bold hover:bg-brand-dark transition-all"
              >
                Contact Us
              </button>
            </ul>
          </motion.div>
        )}
      </motion.nav>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex items-center overflow-hidden"
        style={{
          backgroundImage: `url('${bannerImage}')`
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/50 to-transparent"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-16 max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs sm:text-sm font-semibold border border-white/20"
              >
                HOSPITAL & MEDICAL CLINIC
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-bold text-white mb-3 sm:mb-4 leading-tight"
                style={{ fontSize: 'clamp(1rem, 8vw, 5rem)' }}
              >
                Your Path to Better{' '}
                <span className="text-brand">Health Starts</span> Here.
              </motion.h1>

              {/* CTAs */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(39, 180, 200, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleScrollToSection(appointmentRef)}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-slate-900 rounded-full font-bold text-sm sm:text-base hover:bg-brand hover:text-white transition-all cursor-pointer"
                >
                  Make An Appointment
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveModal('video')}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-brand text-white rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 hover:bg-brand-dark transition-all cursor-pointer"
                >
                  <span className="w-6 sm:w-8 h-6 sm:h-8 bg-white/20 rounded-full flex items-center justify-center text-xs sm:text-base">▶</span>
                  <span className="hidden sm:inline">See How We Work</span>
                  <span className="sm:hidden">How We Work</span>
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex gap-8 sm:gap-12 mt-8 sm:mt-12"
              >
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-brand">48K</div>
                  <div className="text-white text-xs sm:text-sm mt-1">Patients Served</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-brand">25K</div>
                  <div className="text-white text-xs sm:text-sm mt-1">Certified Doctors</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Info Card */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:flex flex-col items-end"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl w-full sm:w-96"
              >
                <div className="text-6xl font-bold text-brand mb-4">98%</div>
                <div className="text-white font-semibold mb-2">Patient Satisfaction</div>

                {/* Avatar Group */}
                <div className="flex -space-x-4 mb-6">
                  {[
                    { name: 'Sarah', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop' },
                    { name: 'John', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop' },
                    { name: 'Emma', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop' }
                  ].map((user, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2, zIndex: 20 }}
                      title={user.name}
                      className="w-10 h-10 rounded-full border-2 border-white overflow-hidden cursor-pointer hover:z-20 transition-all"
                    >
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-brand/30 border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                    +5
                  </div>
                </div>

                <p className="text-white text-sm leading-relaxed">
                  We deliver healthcare services prioritizing comfort, trust, and personalized care for every patient.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOTTOM INFO CARDS */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative -mt-12 sm:-mt-20 w-full px-4 sm:px-6 lg:px-16 max-w-[1376px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 z-20 mb-8 sm:mb-12"
      >
        {/* Emergency Contact */}
        <motion.div
          whileHover={{ y: -10 }}
          className="bg-white rounded-2xl p-5 sm:p-8 shadow-xl border border-gray-100 flex items-start gap-4"
        >
          <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-brand/10 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
            📞
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">Emergency Contact</h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              <a href="tel:832-577-5875" className="hover:text-brand transition font-semibold">(832) 577-5875</a>
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">24/7 Available</p>
          </div>
        </motion.div>

        {/* We Are Here */}
        <motion.div
          whileHover={{ y: -10 }}
          className="bg-white rounded-2xl p-5 sm:p-8 shadow-xl border border-gray-100 flex items-start gap-4"
        >
          <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-brand/10 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
            📍
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">We Are Here</h3>
            <p className="text-gray-600 text-xs sm:text-sm">10707 Corporate Dr, Stafford, TX 77477</p>
          </div>
        </motion.div>

        {/* We Are Available */}
        <motion.div
          whileHover={{ y: -10 }}
          className="bg-white rounded-2xl p-5 sm:p-8 shadow-xl border border-gray-100 sm:col-span-2 lg:col-span-1 flex items-start gap-4"
        >
          <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-brand/10 flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
            🕐
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">We Are Available</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Mon-Sat: 8 AM-5 PM</p>
            <p className="text-gray-600 text-xs sm:text-sm">Sunday: Closed</p>
          </div>
        </motion.div>
      </motion.div>

      {/* ABOUT OUR CLINICS SECTION */}
      <section
        ref={aboutRef} className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-br from-white via-brand-light/5 to-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl -ml-48 -mt-48" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-mid/10 rounded-full blur-3xl -mr-40 -mb-40" />

        <div className="w-full relative z-10 max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left - Image with Badge */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            {/* Image Container */}
            <div className="relative w-full max-w-md">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="rounded-3xl overflow-hidden shadow-2xl h-80 sm:h-[450px] lg:h-[550px] flex items-center justify-center hover:shadow-2xl transition-all"
              >
                <img src={physicianImage} alt="Physician" className="w-full h-full object-cover" />
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-2xl border-4 border-brand/20 hover:border-brand/50 hover:shadow-xl hover:shadow-brand/30 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-brand/20 to-brand-mid/10 flex items-center justify-center text-2xl group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                  >
                    👨‍⚕️
                  </motion.div>
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">25+</div>
                    <div className="text-sm font-semibold text-gray-700 group-hover:text-brand transition-colors">Professional Doctors</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Tag */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block mb-6 px-6 py-2.5 bg-gradient-to-r from-brand/20 to-brand-mid/20 rounded-full text-brand font-bold text-sm border border-brand/30 hover:border-brand/50 transition-all cursor-pointer"
            >
              ✨ ABOUT OUR CLINICS
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="text-gray-900">A</span> <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">Modern Clinic</span><br />
              <span className="text-gray-900">with a Human Heart</span>
            </h2>

            {/* Description */}
            <p className="text-gray-700 text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 leading-relaxed">
              At FamilyChoice Clinix, we deliver high-quality healthcare with integrity. Our clinic blends specialists and modern technology to ensure accurate diagnoses, effective treatments, and personalized care for patients.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {/* Smart Healthcare */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-brand-light hover:border-brand/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-mid/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-brand/20 to-brand-mid/10 flex items-center justify-center mb-4 text-2xl group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                >
                  🔒
                </motion.div>
                <h3 className="relative z-10 font-bold text-xl mb-3 text-gray-900">Smart Healthcare</h3>
                <p className="relative z-10 text-gray-700 text-base leading-relaxed">Protecting your medical data with strict privacy standards and secure systems.</p>
              </motion.div>

              {/* Secure & Confidential */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -10 }}
                className="relative group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-brand-light hover:border-brand/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-mid/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-brand/20 to-brand-mid/10 flex items-center justify-center mb-4 text-2xl group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                >
                  ❤️
                </motion.div>
                <h3 className="relative z-10 font-bold text-xl mb-3 text-gray-900">Secure & Confidential</h3>
                <p className="relative z-10 text-gray-700 text-base leading-relaxed">Protecting your medical data with strict privacy standards and secure systems.</p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: '0 0 30px rgba(39, 180, 200, 0.6), 0 20px 50px rgba(39, 180, 200, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollToSection(servicesRef)}
              className="bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand text-white px-12 py-4 rounded-full font-bold text-lg transition-all shadow-xl relative overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10">More About Us</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE OFFER SECTION */}
      <section
        ref={servicesRef} className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Decorative wavy background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <defs>
              <pattern id="wave-offer" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q25,0 50,50 T100,50" stroke="#27B4C8" strokeWidth="2" fill="none" />
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#wave-offer)" />
          </svg>
        </div>

        <div className="w-full relative z-10 max-w-[1720px] mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-16">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block mb-4 px-6 py-2.5 bg-gradient-to-r from-brand/20 to-brand-mid/20 rounded-full text-brand font-bold text-sm border border-brand/30 hover:border-brand/50 transition-all cursor-pointer"
              >
                ✨ WHAT WE OFFER
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">Smart Medical</span> <span className="text-white-900">Solutions for</span><br />
                <span className="text-white-900">Better Outcomes</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-start lg:items-end gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 0 30px rgba(39, 180, 200, 0.6), 0 20px 50px rgba(39, 180, 200, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScrollToSection(testimonialRef)}
                className="bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand text-white px-8 py-3 rounded-full font-bold transition-all shadow-xl relative overflow-hidden group cursor-pointer"
              >
                <span className="relative z-10">View All Services</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              </motion.button>
            </motion.div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* General Practitioner */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className="relative group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-brand-light hover:border-brand/50 overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-brand-mid/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

              {/* Animated glow background */}
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-brand/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand/20 to-brand-mid/10 flex items-center justify-center mb-6 text-4xl group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                >
                  ⏰
                </motion.div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900">General Practitioner</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Professional medical consultation for common illnesses health concerns.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <motion.span
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white text-xs font-bold group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                    >
                      ✓
                    </motion.span>
                    Fever, flu, infections
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <motion.span
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white text-xs font-bold group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                    >
                      ✓
                    </motion.span>
                    Chronic condition monitoring
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <motion.span
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white text-xs font-bold group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                    >
                      ✓
                    </motion.span>
                    Medical prescriptions
                  </li>
                </ul>

                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  className="text-brand font-bold flex items-center gap-2 hover:gap-4 transition-all group/btn"
                >
                  <span>Learn More</span>
                  <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
                </motion.button>
              </div>
            </motion.div>

            {/* Pediatric Care */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className="relative group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-brand-light hover:border-brand/50 overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-brand-mid/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

              {/* Animated glow background */}
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-brand/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand/20 to-brand-mid/10 flex items-center justify-center mb-6 text-4xl group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                >
                  👶
                </motion.div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900">Pediatric Care</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Dedicated healthcare services for infants, children, and adolescents.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <motion.span
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white text-xs font-bold group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                    >
                      ✓
                    </motion.span>
                    Child health check-ups
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <motion.span
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white text-xs font-bold group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                    >
                      ✓
                    </motion.span>
                    Growth monitoring
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <motion.span
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white text-xs font-bold group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                    >
                      ✓
                    </motion.span>
                    Pediatric treatment
                  </li>
                </ul>

                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  className="text-brand font-bold flex items-center gap-2 hover:gap-4 transition-all group/btn"
                >
                  <span>Learn More</span>
                  <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
                </motion.button>
              </div>
            </motion.div>

            {/* Women's Health */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -15 }}
              className="relative group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-brand-light hover:border-brand/50 overflow-hidden md:col-span-2 lg:col-span-1"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-brand-mid/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

              {/* Animated glow background */}
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-brand/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
              />

              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand/20 to-brand-mid/10 flex items-center justify-center mb-6 text-4xl group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                >
                  👩
                </motion.div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900">Women's Health</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Comprehensive care focused on women's unique medical needs.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-700">
                    <motion.span
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white text-xs font-bold group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                    >
                      ✓
                    </motion.span>
                    Routine examinations
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <motion.span
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white text-xs font-bold group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                    >
                      ✓
                    </motion.span>
                    Reproductive health
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <motion.span
                      whileHover={{ scale: 1.3, rotate: 360 }}
                      className="w-5 h-5 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white text-xs font-bold group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                    >
                      ✓
                    </motion.span>
                    Hormonal consultation
                  </li>
                </ul>

                <motion.button
                  whileHover={{ scale: 1.1, x: 5 }}
                  className="text-brand font-bold flex items-center gap-2 hover:gap-4 transition-all group/btn"
                >
                  <span>Learn More</span>
                  <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-b from-white via-brand-light/40 to-brand-light/20 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl -ml-48 -mt-48" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-mid/5 rounded-full blur-3xl -mr-48 -mb-48" />

        <div className="w-full relative z-10 max-w-[1720px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block mb-4 px-6 py-2.5 bg-gradient-to-r from-brand/20 to-brand-mid/20 rounded-full text-brand font-bold text-sm border border-brand/30 hover:border-brand/50 transition-all cursor-pointer"
            >
              ✨ WHY CHOOSE US
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">Healthcare Built</span> <span className="text-gray-900">on</span><br />
              <span className="text-gray-900">Trust, Precision & Care</span>
            </h2>
          </motion.div>

          {/* Main Content - Doctor Image with Features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center relative">
            {/* Left Features */}
            <div className="space-y-6 flex flex-col justify-center">
              {/* Expert Medical Team */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-brand-light hover:border-brand/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-mid/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-xl flex-shrink-0 group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                  >
                    👨‍⚕️
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Expert Medical Team</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">Our clinic has experienced doctors dedicated to accurate diagnosis and effective treatment.</p>
                  </div>
                </div>
              </motion.div>

              {/* Patient-Centered Care */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-brand-light hover:border-brand/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-mid/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -10 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-xl flex-shrink-0 group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                  >
                    🤝
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Patient-Centered Care</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">We prioritize your comfort, concerns, and individual health needs in every consultation.</p>
                  </div>
                </div>
              </motion.div>

              {/* Modern Facilities */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-brand-light hover:border-brand/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-mid/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-xl flex-shrink-0 group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                  >
                    🏥
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Modern Facilities</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">Equipped with up-to-date medical tools and a clean, comfortable clinical environment.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Center - Doctor Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex justify-center items-center relative"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative"
              >
                {/* Glow background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/30 to-brand-mid/20 rounded-full blur-3xl -z-10" />

                {/* Doctor image placeholder with actual image */}
                <div className="w-[512px] h-[640px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white flex items-center justify-center hover:shadow-2xl hover:shadow-brand/40 transition-all">
                  <img src={youngDoctorImage} alt="Young Doctor" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </motion.div>

            {/* Right Features */}
            <div className="space-y-6 flex flex-col justify-center">
              {/* Efficient Scheduling */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: -10 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-brand-light hover:border-brand/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-mid/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -10 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-xl flex-shrink-0 group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                  >
                    📅
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Efficient Scheduling</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">Minimized waiting time with organized scheduling and smooth patient flow management.</p>
                  </div>
                </div>
              </motion.div>

              {/* Integrated Medical Care */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: -10 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-brand-light hover:border-brand/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-mid/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-xl flex-shrink-0 group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                  >
                    🔗
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Integrated Medical Care</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">From consultation to follow-up, we provide complete and integrated medical care.</p>
                  </div>
                </div>
              </motion.div>

              {/* Trusted Confidentiality */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ x: -10 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-brand-light hover:border-brand/50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-mid/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -10 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-xl flex-shrink-0 group-hover:shadow-lg group-hover:shadow-brand/40 transition-all"
                  >
                    🔒
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">Trusted Confidentiality</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">Your medical information and privacy are handled with the highest level of professionalism.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* APPOINTMENT SECTION */}
      <section
        ref={appointmentRef} className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Decorative wavy background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <defs>
              <pattern id="wave" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q25,0 50,50 T100,50" stroke="#27B4C8" strokeWidth="2" fill="none" />
              </pattern>
            </defs>
            <rect width="1200" height="600" fill="url(#wave)" />
          </svg>
        </div>

        <div className="w-full relative z-10 max-w-[1720px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-12 items-start lg:items-center">
            {/* Left - Contact Info */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-2.5 bg-brand/20 rounded-full text-brand font-bold text-xs sm:text-sm border border-brand/30 hover:border-brand/50 transition-all cursor-pointer"
              >
                ✨ GET IN TOUCH
              </motion.div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 sm:mb-8 text-white">
                Schedule Your Visit with<br />
                <span className="text-brand">Our Medical Experts</span>
              </h2>

              <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-8 sm:mb-12 leading-relaxed max-w-md">
                Choose your preferred date and time, and our team will ensure a smooth and comfortable consultation experience from start to finish.
              </p>

              {/* Contact Info Cards */}
              <div className="space-y-4 sm:space-y-6">
                {/* Address */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-3 sm:gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-brand/20 border-2 border-brand flex items-center justify-center text-lg sm:text-xl flex-shrink-0 group-hover:bg-brand/30 transition-all"
                  >
                    📍
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1">6281 Liana Extensions, Lemkeport</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Lake Ashiyhaven, NY</p>
                  </div>
                </motion.div>

                {/* Support */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-3 sm:gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-brand/20 border-2 border-brand flex items-center justify-center text-lg sm:text-xl flex-shrink-0 group-hover:bg-brand/30 transition-all"
                  >
                    ✉️
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1">Need medical help?</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">We are here to provide prompt, professional support.</p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-3 sm:gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-brand/20 border-2 border-brand flex items-center justify-center text-lg sm:text-xl flex-shrink-0 group-hover:bg-brand/30 transition-all"
                  >
                    ☎️
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1">(225) 679-9399</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Available 24/7 for consultations</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Appointment Form */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
                <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">Book</span> an Appointment
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-7 sm:space-y-8">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-3.5">Full Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-brand/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all bg-gray-50/50 hover:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-3.5">Email Address*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-brand/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all bg-gray-50/50 hover:bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Phone and Date Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-3.5">Phone Number*</label>
                    <div className="flex gap-0">
                      <span className="px-3 sm:px-4 py-3 sm:py-3.5 bg-gray-100 border-2 border-r-0 border-gray-200 rounded-l-lg sm:rounded-l-xl text-gray-700 font-semibold text-xs sm:text-sm whitespace-nowrap flex items-center">USA +1</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormInputChange}
                        placeholder="(555) 123-4567"
                        inputMode="numeric"
                        maxLength="14"
                        className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-r-lg sm:rounded-r-xl border-2 border-l-0 border-gray-200 hover:border-brand/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all bg-gray-50/50 hover:bg-white"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-3.5">Preferred Date* 📅</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleFormInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-brand/30 focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all bg-white hover:bg-gray-50 cursor-pointer appearance-none"
                      style={{ colorScheme: 'light' }}
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-3 sm:mb-3.5">Message / Special Requests*</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormInputChange}
                    placeholder="Please describe your symptoms or reason for visit..."
                    rows="5"
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-brand/30 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all resize-none bg-gray-50/50 hover:bg-white"
                    required
                  ></textarea>
                </div>


                {/* Checkbox */}
                <div className="flex items-start gap-3 sm:gap-4 bg-brand-light/30 rounded-lg sm:rounded-xl p-4 sm:p-5">
                  <input
                    type="checkbox"
                    id="agree"
                    className="w-3 h-3 rounded border-2 border-brand text-brand focus:ring-brand cursor-pointer mt-0.5 flex-shrink-0 transition-all"
                    required
                  />
                  <label htmlFor="agree" className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                    I agree to the collection and use of my personal information and understand the privacy policy. <span className="text-brand font-bold cursor-pointer hover:underline">Terms & Privacy</span>
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 30px rgba(39, 180, 200, 0.6)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full bg-gradient-to-r from-brand to-brand-dark hover:from-brand-dark hover:to-brand text-white font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-full text-sm sm:text-base transition-all shadow-lg hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed text-center"
                >
                  {formSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Sending your request...
                    </span>
                  ) : (
                    '✓ Make Appointment'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS/CTA SECTION */}
      <section
        ref={testimonialRef} className="w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-16 bg-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-mid/10 rounded-full blur-3xl -ml-40 -mb-40" />

        <div className="w-full relative z-10 max-w-[1720px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block mb-4 px-6 py-2.5 bg-gradient-to-r from-brand/20 to-brand-mid/20 rounded-full text-brand font-bold text-sm border border-brand/30 hover:border-brand/50 transition-all cursor-pointer"
            >
              ⭐ PATIENT TESTIMONIALS
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent">What Our Patients</span><br />
              <span className="text-gray-900">Say About Us</span>
            </h2>

            <p className="text-center text-gray-600 text-base sm:text-lg mx-auto">
              Real experiences from our valued patients who trust FamilyChoice Clinix for their healthcare needs.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-brand-light hover:border-brand/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-mid/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  "The doctors here are extremely professional and caring. They took time to understand my concerns and provided excellent treatment. Highly recommended!"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-bold">
                    SK
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Sarah Khan</h4>
                    <p className="text-xs text-gray-600">Patient</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-brand-light hover:border-brand/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-mid/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  "Best clinic in the area! The staff is friendly, the facility is clean, and the doctors are knowledgeable. Worth every visit."
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-bold">
                    MJ
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Michael Johnson</h4>
                    <p className="text-xs text-gray-600">Patient</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-brand-light hover:border-brand/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-mid/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  "My family visits FamilyChoice Clinix for all our healthcare needs. The doctors are attentive and the appointment booking process is so easy!"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-bold">
                    ER
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Emily Roberts</h4>
                    <p className="text-xs text-gray-600">Patient</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
            <defs>
              <pattern id="footer-wave" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 Q25,0 50,50 T100,50" stroke="#27B4C8" strokeWidth="2" fill="none" />
              </pattern>
            </defs>
            <rect width="1200" height="400" fill="url(#footer-wave)" />
          </svg>
        </div>

        <div className="w-full relative z-10 max-w-[1720px] mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 mb-8 sm:mb-12 lg:mb-16">
            {/* Brand Column */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Logo className="w-40 h-40 sm:w-48" />
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                FamilyChoice Clinix is a modern clinic offering reliable healthcare through experienced doctors and patient-centered care.
              </p>
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.15 }}
                  href="#"
                  className="w-10 h-10 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center hover:bg-brand/30 hover:border-brand transition-all"
                >
                  <span>f</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.15 }}
                  href="#"
                  className="w-10 h-10 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center hover:bg-brand/30 hover:border-brand transition-all"
                >
                  <span>𝕏</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.15 }}
                  href="#"
                  className="w-10 h-10 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center hover:bg-brand/30 hover:border-brand transition-all"
                >
                  <span>✈️</span>
                </motion.a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white">Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { label: 'Home', ref: heroRef },
                  { label: 'About Us', ref: aboutRef },
                  { label: 'Services', ref: servicesRef },
                  { label: 'Testimonials', ref: testimonialRef },
                  { label: 'Contact', ref: appointmentRef }
                ].map((link) => (
                  <li key={link.label}>
                    <motion.a
                      whileHover={{ x: 5, color: '#27B4C8' }}
                      onClick={() => handleScrollToSection(link.ref)}
                      className="text-gray-400 hover:text-brand text-xs sm:text-sm transition-colors cursor-pointer"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Our Services */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white">Our Services</h4>
              <ul className="space-y-2 sm:space-y-3">
                {['General Practitioner', 'Pediatric Care', "Women's Health", 'Laboratory & Diagnostic', 'Emergency Care', 'Consultation'].map((service) => (
                  <li key={service}>
                    <motion.a
                      whileHover={{ x: 5, color: '#27B4C8' }}
                      href="#"
                      className="text-gray-400 hover:text-brand text-xs sm:text-sm transition-colors"
                    >
                      {service}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white">Business Hours</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-300">Monday - Saturday</div>
                  <div className="text-xs sm:text-sm text-gray-400">8:00 AM - 5:00 PM</div>
                  <div className="text-xs sm:text-sm text-gray-500">By appointment</div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-300">Sunday</div>
                  <div className="text-xs sm:text-sm text-brand font-semibold">Closed</div>
                </div>
                <div className="pt-3 border-t border-gray-700">
                  <a href="tel:832-577-5875" className="text-xs sm:text-sm text-brand hover:text-brand-dark transition font-semibold">📞 Call: (832) 577-5875</a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent mb-6 sm:mb-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-xs sm:text-sm text-gray-400"
            >
              © 2026 FamilyChoice Clinix. All Right Reserved.
            </motion.p>
            <div className="flex gap-6 sm:gap-8">
              <motion.button
                whileHover={{ color: '#27B4C8' }}
                onClick={() => setActiveModal('privacy')}
                className="text-xs sm:text-sm text-gray-400 hover:text-brand transition-colors cursor-pointer"
              >
                Privacy Policy
              </motion.button>
              <motion.button
                whileHover={{ color: '#27B4C8' }}
                onClick={() => setActiveModal('terms')}
                className="text-xs sm:text-sm text-gray-400 hover:text-brand transition-colors cursor-pointer"
              >
                Terms of Condition
              </motion.button>
              <motion.button
                whileHover={{ color: '#27B4C8' }}
                onClick={() => setActiveModal('contact')}
                className="text-xs sm:text-sm text-gray-400 hover:text-brand transition-colors cursor-pointer"
              >
                Contact Support
              </motion.button>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* Privacy Policy Modal */}
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={() => setActiveModal(null)}
        title="Privacy Policy"
        size="xl"
      >
        <div className="space-y-6 text-gray-700 text-sm sm:text-base">
          <div>
            <h3 className="text-lg font-bold text-brand mb-3">1. Information We Collect</h3>
            <p>We collect personal information when you book an appointment, including your name, email, phone number, and medical history. This information is used solely to provide healthcare services and improve patient experience.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-brand mb-3">2. How We Use Your Information</h3>
            <p>Your personal information is used to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Schedule and manage your appointments</li>
              <li>Send appointment reminders and medical updates</li>
              <li>Improve our healthcare services</li>
              <li>Comply with medical regulations and legal requirements</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-brand mb-3">3. Data Protection</h3>
            <p>We use industry-standard encryption and security measures to protect your personal and medical information. Your data is never shared with third parties without your explicit consent.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-brand mb-3">4. Your Rights</h3>
            <p>You have the right to access, modify, or delete your personal information at any time. Contact us at <span className="font-semibold">privacy@familychoice.com</span> to exercise these rights.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-brand mb-3">5. Cookie Usage</h3>
            <p>Our website uses cookies to enhance your browsing experience. You can disable cookies in your browser settings if you prefer.</p>
          </div>

          <div className="bg-brand/10 border border-brand/30 rounded-lg p-4">
            <p className="text-xs sm:text-sm"><span className="font-bold">Last Updated:</span> May 26, 2026</p>
          </div>
        </div>
      </Modal>

      {/* Terms and Conditions Modal */}
      <Modal
        isOpen={activeModal === 'terms'}
        onClose={() => setActiveModal(null)}
        title="Terms and Conditions"
        size="xl"
      >
        <div className="space-y-6 text-gray-700 text-sm sm:text-base">
          <div>
            <h3 className="text-lg font-bold text-brand mb-3">1. Acceptance of Terms</h3>
            <p>By using FamilyChoice Clinix services, you agree to these terms and conditions. If you do not agree, please refrain from using our services.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-brand mb-3">2. Medical Services</h3>
            <p>Our healthcare services are provided by licensed medical professionals. Patients agree to follow medical advice and attend scheduled appointments. FamilyChoice Clinix reserves the right to decline service to patients who violate clinic policies.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-brand mb-3">3. Appointment Policy</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Appointments must be booked at least 24 hours in advance</li>
              <li>Cancellations must be made 12 hours before the appointment</li>
              <li>Late cancellations may result in a consultation fee</li>
              <li>Patients arriving more than 15 minutes late may be rescheduled</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-brand mb-3">4. Payment Terms</h3>
            <p>Payment is required at the time of service unless prior arrangements have been made. We accept all major credit cards, insurance, and payment plans.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-brand mb-3">5. Liability Disclaimer</h3>
            <p>FamilyChoice Clinix provides medical services as-is. While we strive for excellence, we are not liable for any indirect or consequential damages arising from healthcare services.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-brand mb-3">6. Emergency Services</h3>
            <p>In case of medical emergencies, please call 911 or visit the nearest emergency room. Our 24/7 support line is for urgent consultations only.</p>
          </div>

          <div className="bg-brand/10 border border-brand/30 rounded-lg p-4">
            <p className="text-xs sm:text-sm"><span className="font-bold">Last Updated:</span> May 26, 2026</p>
          </div>
        </div>
      </Modal>

      {/* Contact Support Modal */}
      <Modal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
        title="Contact Support"
        size="lg"
      >
        <div className="space-y-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
                <span className="text-brand text-xl">📞</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                <p className="text-gray-600 text-sm">+1 (225) 679-9399</p>
                <p className="text-gray-500 text-xs">Available 24/7 for emergencies</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
                <span className="text-brand text-xl">📧</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                <p className="text-gray-600 text-sm">support@familychoice.com</p>
                <p className="text-gray-500 text-xs">Response within 24 hours</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
                <span className="text-brand text-xl">📍</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                <p className="text-gray-600 text-sm">10707 Corporate Dr</p>
                <p className="text-gray-500 text-xs">Stafford, TX 77477</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4 items-start"
            >
              <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0">
                <span className="text-brand text-xl">🕐</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Business Hours</h4>
                <p className="text-gray-600 text-sm">Mon - Fri: 8:00 AM - 5:00 PM</p>
                <p className="text-gray-500 text-xs">Sat: 8:00 AM - 4:00 PM | Sun: Closed</p>
              </div>
            </motion.div>
          </div>

          {/* Departments */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-bold text-gray-900 mb-4">Department-Specific Support</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">General Inquiries:</span> <span className="text-gray-600">info@familychoice.com</span></p>
              <p><span className="font-semibold">Billing:</span> <span className="text-gray-600">billing@familychoice.com</span></p>
              <p><span className="font-semibold">Medical Records:</span> <span className="text-gray-600">records@familychoice.com</span></p>
              <p><span className="font-semibold">Complaints:</span> <span className="text-gray-600">complaints@familychoice.com</span></p>
            </div>
          </div>

          {/* Quick Tip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-brand/10 to-brand-mid/10 border border-brand/30 rounded-lg p-4"
          >
            <p className="text-xs sm:text-sm text-gray-700"><span className="font-bold text-brand">💡 Tip:</span> For faster response, include your appointment date and patient ID in your inquiry.</p>
          </motion.div>
        </div>
      </Modal>

      {/* Video Modal */}
      <Modal
        isOpen={activeModal === 'video'}
        onClose={() => setActiveModal(null)}
        title="How We Work - FamilyChoice Clinix"
        size="xl"
      >
        <div className="w-full bg-black rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/1Bpj38bxJ60?si=PKalA5DuiGlrLfgD"
            title="FamilyChoice Clinix - How We Work"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-bold text-gray-900">Experience Premium Healthcare</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            At FamilyChoice Clinix, we combine modern medical expertise with compassionate patient care. Our streamlined appointment process, experienced medical professionals, and state-of-the-art facilities ensure you receive the best healthcare experience possible.
          </p>
          <p className="text-gray-600 text-sm font-semibold">
            Ready to schedule your appointment? Click the button below to get started today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveModal(null)
              setTimeout(() => handleScrollToSection(appointmentRef), 300)
            }}
            className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-brand to-brand-dark text-white font-bold rounded-full hover:shadow-lg transition-all"
          >
            Book an Appointment Now
          </motion.button>
        </div>
      </Modal>
    </div>
  )
}

export default App
