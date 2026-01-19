import React from "react"
import { useState } from "react"
import { hotels } from "../data/hotels"
import HotelCard from "../components/HotelCard"
import { SearchBar } from "../components/SearchBar"

interface HomeProps {
  onOpenAuth?: () => void
}

const Home = ({ onOpenAuth }: HomeProps) => {
  const [query, setQuery] = useState("")
  const [maxPrice, setMaxPrice] = useState(10000)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState<"priceLow" | "priceHigh" | "rating">(
    "rating"
  )

  const filteredHotels = hotels
    .filter(h =>
      h.city.toLowerCase().includes(query.toLowerCase())
    )
    .filter(h => h.price <= maxPrice)
    .filter(h => h.rating >= minRating)
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price
      if (sortBy === "priceHigh") return b.price - a.price
      return b.rating - a.rating
    })

  return (
    <div className="container">
      <h1>Hotel Booking</h1>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search by city..."
      />

      {/* Filters */}
      <div style={{ margin: "20px 0", display: "flex", gap: "20px" }}>
        <div>
          <label>Max Price: ₹{maxPrice}</label>
          <input
            type="range"
            min={1000}
            max={10000}
            step={500}
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Min Rating</label>
          <select onChange={e => setMinRating(Number(e.target.value))}>
            <option value={0}>All</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
            <option value={4.5}>4.5+</option>
          </select>
        </div>

        <div>
          <label>Sort</label>
          <select onChange={e => setSortBy(e.target.value as any)}>
            <option value="rating">Rating</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Hotels */}
      <div className="hotel-grid">
        {filteredHotels.length > 0 ? (
          filteredHotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))
        ) : (
          <p>No hotels found</p>
        )}
      </div>
    </div>
  )
}

export default Home
