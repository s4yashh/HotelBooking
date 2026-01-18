import { Link } from "react-router-dom"

export default function BookingSuccess() {
  return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <h1>🎉 Booking Confirmed</h1>
      <p>Your stay has been successfully booked.</p>

      <Link to="/">Back to Home</Link>
    </div>
  )
}
