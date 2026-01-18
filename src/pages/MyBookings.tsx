import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Booking } from "../types/booking"
import { useAuth } from "../hooks/useAuth"

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login")
      return
    }

    // Fetch bookings from localStorage (in a real app, this would be an API call)
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    setBookings(storedBookings)
  }, [user, loading, navigate])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "status-confirmed"
      case "pending":
        return "status-pending"
      case "cancelled":
        return "status-cancelled"
      default:
        return ""
    }
  }

  const handleCancel = (bookingId: string) => {
    const updatedBookings = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "cancelled" as const } : b
    )
    setBookings(updatedBookings)
    localStorage.setItem("bookings", JSON.stringify(updatedBookings))
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="bookings-page">
      <h1>My Bookings</h1>

      {bookings.length > 0 ? (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <div>
                  <h3>{booking.hotelName}</h3>
                  <p className="booking-id">Booking #{booking.id}</p>
                </div>
                <span className={`status ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>

              <div className="booking-details">
                <div className="detail-item">
                  <span className="label">Check-in:</span>
                  <span>{new Date(booking.checkIn).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Check-out:</span>
                  <span>{new Date(booking.checkOut).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Guests:</span>
                  <span>{booking.guests}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Total Price:</span>
                  <span className="price">₹{booking.totalPrice}</span>
                </div>
              </div>

              <div className="booking-actions">
                {booking.status === "confirmed" && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="cancel-button"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-bookings">You haven't made any bookings yet.</p>
      )}
    </div>
  )
}

export default MyBookings
