import { Hotel } from "../data/hotels"
import React from "react"
import "../styles/HotelCard.css"


interface Props {
  hotel: Hotel
}

const HotelCard = ({ hotel }: Props) => {
  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} />

      <div className="hotel-info">
        <h3>{hotel.name}</h3>
        <p className="city">{hotel.city}</p>

        <div className="meta">
          <span>⭐ {hotel.rating}</span>
          <span>₹{hotel.price} / night</span>
        </div>

        <div className="amenities">
          {hotel.amenities.map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>

        <button>Book Now</button>
      </div>
    </div>
  )
}

export default HotelCard
