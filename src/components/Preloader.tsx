import React from 'react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  useEffect(() => {
    // Auto-complete after one full animation cycle (1.4 seconds)
    const timer = setTimeout(() => {
      onComplete()
    }, 1400)

    return () => {
      clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        {/* Rotating Image - Very Small (text size) */}
        <motion.img
          src="/hexagon-removebg-preview.svg"
          alt="Loading"
          style={{ width: 60, height: 60 }}
          className="object-contain"
          animate={{ 
            rotate: [0, -180, -180, 0],
            x: [0, 0, 0, 150],
            scale: [0.5, 1.5, 1.5, 0.5]
          }}
          transition={{ 
            duration: 1.4, 
            repeat: Infinity, 
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.36, 0.4, 1]
          }}
        />
      </div>
    </motion.div>
  )
}
