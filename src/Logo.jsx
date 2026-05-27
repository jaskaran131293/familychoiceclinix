import React from 'react'
import { motion } from 'framer-motion'
import logoImg from './assets/logo-fc.png'

export default function Logo({ className = 'w-10 h-10' }) {
    return (
        <motion.img
            src={logoImg}
            alt="FamilyChoice Clinix Logo"
            className={`${className} object-contain object-center`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
        />
    )
}
