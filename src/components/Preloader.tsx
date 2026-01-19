import React from 'react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [canEnter, setCanEnter] = useState(false)

  useEffect(() => {
    // Allow entering after 2 seconds
    const enterTimer = setTimeout(() => {
      setCanEnter(true)
    }, 2000)

    return () => {
      clearTimeout(enterTimer)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (canEnter && e.key === 'Enter') {
        onComplete()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [canEnter, onComplete])

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
            ease: 'linear',
            times: [0, 0.36, 0.4, 1]
          }}
        />

        {/* Instruction Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={canEnter ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-cyan-400 text-xs font-medium tracking-wide text-center"
        >
          Press ENTER to continue
        </motion.p>
      </div>
    </motion.div>
  )
}
