import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { AuthModal } from "./components/AuthModal"
import { Preloader } from "./components/Preloader"
import Home from "./pages/Home"
import HotelDetails from "./pages/HotelDetails"
import Booking from "./pages/Booking"
import BookingSuccess from "./pages/BookingSuccess"
import MyBookings from "./pages/MyBookings"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return <>{children}</>
}

function AppContent() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    // Always show preloader for now (remove the localStorage check)
    // const hasSeenPreloader = localStorage.getItem('hasSeenPreloader')
    // if (hasSeenPreloader) {
    //   setShowPreloader(false)
    // }
    // Preloader will always show on page load
  }, [])

  const handlePreloaderComplete = () => {
    setShowPreloader(false)
    localStorage.setItem('hasSeenPreloader', 'true')
  }

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />
  }

  return (
    <>
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      <Routes>
        <Route path="/" element={<Home onOpenAuth={() => setIsAuthOpen(true)} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route
          path="/hotel/:id/book"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/success"
          element={
            <ProtectedRoute>
              <BookingSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
      </Routes>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}
