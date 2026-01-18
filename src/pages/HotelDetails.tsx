import { useParams, useNavigate } from "react-router-dom"
import hotels from "../data/hotels.json"
import "../styles/HotelDetails.css"

export default function HotelDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const hotel = hotels.find(h => h.id === id)

  if (!hotel) return <p>Hotel not found</p>

  return (
    <div className="hotel-details">
      <img src={hotel.image} alt={hotel.name} />
      <h1>{hotel.name}</h1>
      <p>{hotel.city}</p>
      <p>⭐ {hotel.rating}</p>
      <h2>₹{hotel.price} / night</h2>

      <button onClick={() => navigate(`/hotel/${hotel.id}/book`)}>
        Book Now
      </button>
    </div>
  )
}
