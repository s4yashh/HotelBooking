import React from 'react'
import { useState } from 'react'
import { Mail, Lock, X, AlertCircle, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { signIn, signUp } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showVerification, setShowVerification] = useState(false)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simple validation
    if (!email || !password) {
      setError('Email and password are required')
      setLoading(false)
      return
    }

    if (isSignUp && !name) {
      setError('Name is required for signup')
      setLoading(false)
      return
    }

    try {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: isSignUp ? name : email.split('@')[0],
      }

      if (isSignUp) {
        signUp(userData)
        setShowVerification(true)
      } else {
        signIn(userData)
        onClose()
      }
    } catch (err) {
      setError('Authentication failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleModalClose = () => {
    setShowVerification(false)
    setIsSignUp(false)
    setError('')
    setEmail('')
    setPassword('')
    setName('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            layout
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden p-8"
          >
            <button
              onClick={handleModalClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>

            {!showVerification ? (
              <>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-slate-500 mb-8 text-sm">
                  {isSignUp
                    ? 'Join us to book your perfect stay'
                    : 'Sign in to your account'}
                </p>

                <form onSubmit={handleAuth} className="space-y-4">
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-50 border border-red-100 p-3 rounded-xl flex items-center gap-2 text-red-600 text-xs font-semibold overflow-hidden"
                      >
                        <AlertCircle size={14} />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isSignUp && (
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-4 text-slate-400"
                      size={18}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-4 text-slate-400"
                      size={18}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg active:scale-95 disabled:bg-slate-400"
                  >
                    {loading
                      ? 'Processing...'
                      : isSignUp
                        ? 'Join Now'
                        : 'Sign In'}
                  </button>
                </form>

                <p className="mt-8 text-center text-slate-600 text-sm">
                  {isSignUp ? "Already a member?" : "New to our platform?"}{' '}
                  <button
                    onClick={() => {
                      setIsSignUp(!isSignUp)
                      setError('')
                    }}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    {isSignUp ? 'Sign In' : 'Create an Account'}
                  </button>
                </p>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                  <CheckCircle size={44} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  Account Created!
                </h2>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Welcome <span className="font-semibold text-slate-900">{name}</span>! Your account has been successfully created.
                </p>
                <button
                  onClick={handleModalClose}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all"
                >
                  Continue to Home
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
