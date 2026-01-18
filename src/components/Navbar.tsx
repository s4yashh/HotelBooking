import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <h1>🏨 HotelBooking</h1>
        </div>
        <div className="navbar-menu">
          {user ? (
            <>
              <span className="user-welcome">Welcome, {user.username}!</span>
              <button onClick={() => navigate("/bookings")} className="nav-button">
                My Bookings
              </button>
              <button onClick={handleLogout} className="nav-button logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="nav-button">
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
