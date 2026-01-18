import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Hotel } from "../types/hotel"
import { Booking as BookingType } from "../types/booking"

interface LocationState {
  hotel: Hotel
  checkIn: string
  checkOut: string
  guests: number
}

const Booking: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { hotel, checkIn, checkOut, guests } = (location.state as LocationState) || {}
  const [loading, setLoading] = useState(false)

  if (!hotel) {
    return <div className="error-message">Booking information not found</div>
  }

  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
  const totalPrice = nights * hotel.price

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create booking object
      const booking: BookingType = {
        id: `BK${Date.now()}`,
        hotelId: hotel.id,
        hotelName: hotel.name,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        status: "confirmed",
        bookingDate: new Date().toISOString().split("T")[0],
      }

      // Store booking (in a real app, this would be an API call)
      const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
      existingBookings.push(booking)
      localStorage.setItem("bookings", JSON.stringify(existingBookings))

      navigate("/bookings")
    } catch (err) {
      console.error("Booking failed:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="booking-confirm-page">
      <h1>Confirm Your Booking</h1>

      <div className="confirm-container">
        <div className="hotel-summary">
          <img src={hotel.image} alt={hotel.name} className="summary-image" />
          <div className="summary-info">
            <h2>{hotel.name}</h2>
            <p className="city">📍 {hotel.city}</p>
            <p className="property-type">{hotel.type}</p>
          </div>
        </div>

        <div className="booking-summary">
          <h3>Booking Details</h3>

          <div className="summary-item">
            <span className="label">Check-in:</span>
            <span>{new Date(checkIn).toLocaleDateString()}</span>
          </div>

          <div className="summary-item">
            <span className="label">Check-out:</span>
            <span>{new Date(checkOut).toLocaleDateString()}</span>
          </div>

          <div className="summary-item">
            <span className="label">Number of Nights:</span>
            <span>{nights}</span>
          </div>

          <div className="summary-item">
            <span className="label">Guests:</span>
            <span>{guests}</span>
          </div>

          <div className="summary-item">
            <span className="label">Price per Night:</span>
            <span>₹{hotel.price}</span>
          </div>

          <div className="summary-item total">
            <span className="label">Total Price:</span>
            <span className="total-price">₹{totalPrice}</span>
          </div>

          <form onSubmit={handleConfirm}>
            <button type="submit" disabled={loading} className="confirm-button">
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Booking
