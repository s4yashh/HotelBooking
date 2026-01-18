import { Hotel } from "../types/hotel"
import { useNavigate } from "react-router-dom"
import "../styles/HotelCard.css"

interface Props {
  hotel: Hotel
  view: "grid" | "list"
}

const amenityIcons: Record<string, string> = {
  WiFi: "📶",
  Pool: "🏊",
  Parking: "🅿️",
  AC: "❄️",
  Beach: "🏖️",
  Kitchen: "🍳",
}

export default function HotelCard({ hotel, view }: Props) {
  const navigate = useNavigate()

  return (
    <div
      className={`hotel-card ${view}`}
      onClick={() => navigate(`/hotel/${hotel.id}`)}
    >
      {/* Image */}
      <div className="hotel-image">
        <img src={hotel.image} alt={hotel.name} loading="lazy" />
        <span className="hotel-type">{hotel.type}</span>
      </div>

      {/* Content */}
      <div className="hotel-content">
        <div className="hotel-header">
          <h3>{hotel.name}</h3>
          <span className="rating">⭐ {hotel.rating}</span>
        </div>

        <p className="location">{hotel.city}</p>

        {/* Amenities */}
        <div className="amenities">
          {hotel.amenities.slice(0, 4).map((a) => (
            <span key={a} title={a}>
              {amenityIcons[a] || "✔️"}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="hotel-footer">
          <div className="price">
            ₹{hotel.price.toLocaleString()}
            <span>/ night</span>
          </div>

          <button
            className="view-btn"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/hotel/${hotel.id}`)
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
