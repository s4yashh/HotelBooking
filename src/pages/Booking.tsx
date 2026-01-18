import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import hotels from "../data/hotels.json"
import "../styles/Booking.css"

export default function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const hotel = hotels.find(h => h.id === id)

  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)

  if (!hotel) return <p>Hotel not found</p>

  const nights =
    checkIn && checkOut
      ? (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
      : 0

  const basePrice = nights > 0 ? nights * hotel.price : 0
  const tax = Math.round(basePrice * 0.12)
  const total = basePrice + tax

  const confirmBooking = () => {
    const booking = {
      id: Date.now(),
      hotel: hotel.name,
      city: hotel.city,
      checkIn,
      checkOut,
      guests,
      total
    }

    const prev = JSON.parse(localStorage.getItem("bookings") || "[]")
    localStorage.setItem("bookings", JSON.stringify([...prev, booking]))

    navigate("/booking/success")
  }

  return (
    <div className="booking">
      <h1>Confirm Booking</h1>

      <div className="booking-card">
        <h2>{hotel.name}</h2>
        <p>{hotel.city}</p>

        <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
        <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />

        <select value={guests} onChange={e => setGuests(+e.target.value)}>
          {[1,2,3,4].map(g => (
            <option key={g}>{g} Guest{g > 1 && "s"}</option>
          ))}
        </select>

        <div className="price">
          <p>Base: ₹{basePrice}</p>
          <p>Tax (12%): ₹{tax}</p>
          <h3>Total: ₹{total}</h3>
        </div>

        <button
          disabled={!checkIn || !checkOut || nights <= 0}
          onClick={confirmBooking}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  )
}
