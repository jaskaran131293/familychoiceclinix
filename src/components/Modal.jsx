/**
 * Modal Component
 * Reusable modal with Framer Motion animations
 */
import { motion, AnimatePresence } from 'framer-motion'

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-2xl'
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 ${sizeClasses[size]} w-full mx-4`}
                    >
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-brand via-brand-mid to-brand-dark px-6 sm:px-8 py-6 sm:py-8 flex justify-between items-center">
                                <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onClose}
                                    className="text-white hover:text-gray-200 transition-colors text-2xl"
                                >
                                    ✕
                                </motion.button>
                            </div>

                            {/* Content */}
                            <div className="px-6 sm:px-8 py-6 sm:py-8 max-h-[70vh] overflow-y-auto">
                                {children}
                            </div>

                            {/* Footer */}
                            <div className="border-t border-gray-200 px-6 sm:px-8 py-4 sm:py-5 flex justify-end">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onClose}
                                    className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-brand to-brand-dark text-white font-semibold rounded-full hover:shadow-lg transition-all"
                                >
                                    Close
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default Modal
