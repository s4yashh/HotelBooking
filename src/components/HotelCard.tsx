import React from "react"
import { Hotel } from "../types/hotel"
import { useNavigate } from "react-router-dom"

interface HotelCardProps {
  hotel: Hotel
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const navigate = useNavigate()

  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} className="hotel-image" />
      <div className="hotel-content">
        <div className="hotel-header">
          <h2>{hotel.name}</h2>
          <span className="property-type">{hotel.type}</span>
        </div>
        <p className="city">📍 {hotel.city}</p>
        <div className="amenities">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="amenity-tag">
              {amenity}
            </span>
          ))}
        </div>
        <div className="card-footer">
          <div className="rating">
            <span className="stars">⭐ {hotel.rating}</span>
            <span className="reviews">({hotel.reviews} reviews)</span>
          </div>
          <div className="price-section">
            <span className="price">₹{hotel.price}/night</span>
            <button
              className="view-button"
              onClick={() => navigate(`/hotel/${hotel.id}`)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
