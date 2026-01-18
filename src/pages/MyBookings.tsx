import { useEffect, useState } from "react"
import "../styles/MyBookings.css"

interface Booking {
  id: number
  hotel: string
  city: string
  checkIn: string
  checkOut: string
  guests: number
  total: number
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings") || "[]")
    setBookings(data)
  }, [])

  const cancelBooking = (id: number) => {
    const updated = bookings.filter(b => b.id !== id)
    setBookings(updated)
    localStorage.setItem("bookings", JSON.stringify(updated))
  }

  if (bookings.length === 0) {
    return (
      <div className="my-bookings empty">
        <h2>No bookings yet</h2>
        <p>Your confirmed bookings will appear here.</p>
      </div>
    )
  }

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>

      {bookings.map(b => (
        <div className="booking-item" key={b.id}>
          <div>
            <h3>{b.hotel}</h3>
            <p>{b.city}</p>
            <p>
              {b.checkIn} → {b.checkOut}
            </p>
            <p>{b.guests} Guest(s)</p>
            <strong>₹{b.total}</strong>
          </div>

          <button onClick={() => cancelBooking(b.id)}>
            Cancel
          </button>
        </div>
      ))}
    </div>
  )
}
