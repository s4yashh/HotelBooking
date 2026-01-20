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
        <div style={{ position: 'relative' }}>
          <motion.img
            src="/hexagon-removebg-preview.svg"
            alt="Loading"
            style={{ width: 60, height: 60 }}
            className="object-contain"
            animate={{ 
              rotate: [0, -180, -180, 0],
              x: [0, 0, 0, 100],
              scale: [0.5, 1.5, 1.5, 0.5]
            }}
            transition={{ 
              duration: 1.4, 
              repeat: Infinity, 
              ease: [0.25, 0.46, 0.45, 0.94],
              times: [0, 0.36, 0.4, 1]
            }}
          />

          {/* ESCAPE Text - Absolutely positioned (separate layer) */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: '-40px',
              display: 'flex',
              gap: '6px',
            }}
          >
            {['E', 'S', 'C', 'A', 'P', 'E'].map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + index * 0.08,
                }}
                style={{ 
                  fontSize: '32px',
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 590
                }}
                className="text-white tracking-[0.2em]"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
