import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { hotels } from "../data/hotels"

const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)

  const hotel = hotels.find((h) => h.id === parseInt(id || ""))

  if (!hotel) {
    return <div className="error-message">Hotel not found</div>
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (checkIn && checkOut) {
      navigate(`/booking/${hotel.id}`, {
        state: { hotel, checkIn, checkOut, guests },
      })
    }
  }

  return (
    <div className="hotel-details-page">
      <button onClick={() => navigate("/")} className="back-button">
        ← Back to Hotels
      </button>

      <div className="details-container">
        <div className="hotel-hero">
          <img src={hotel.image} alt={hotel.name} />
        </div>

        <div className="details-content">
          <div className="details-header">
            <div>
              <h1>{hotel.name}</h1>
              <p className="city">📍 {hotel.city}</p>
            </div>
            <span className="property-type-large">{hotel.type}</span>
          </div>

          <div className="rating-section">
            <span className="rating">⭐ {hotel.rating}</span>
            <span className="reviews">({hotel.reviews} reviews)</span>
          </div>

          <h3>Amenities</h3>
          <div className="amenities-list">
            {hotel.amenities.map((amenity) => (
              <span key={amenity} className="amenity">
                ✓ {amenity}
              </span>
            ))}
          </div>

          <form onSubmit={handleBooking} className="booking-form">
            <h3>Book Your Stay</h3>

            <div className="form-group">
              <label htmlFor="checkIn">Check-in Date</label>
              <input
                id="checkIn"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkOut">Check-out Date</label>
              <input
                id="checkOut"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="guests">Number of Guests</label>
              <input
                id="guests"
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              />
            </div>

            <button type="submit" className="book-button">
              Proceed to Booking
            </button>
          </form>

          <div className="price-info">
            <h3>₹{hotel.price} per night</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelDetails
