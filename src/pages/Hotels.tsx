import { useEffect, useMemo, useState } from "react"
import HotelCard from "../components/HotelCard"
import { Hotel } from "../types/hotel"
import "../styles/Hotels.css"

// 🔹 Mock data (replace later with API)
import hotelsData from "../data/hotels.json"

export default function Hotels() {
  const [search, setSearch] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [sort, setSort] = useState<"priceLow" | "priceHigh" | "rating">(
    "priceLow"
  )
  const [filters, setFilters] = useState({
    wifi: false,
    pool: false,
    parking: false,
    ac: false,
  })

  // -------------------- FILTER + SORT --------------------

  const filteredHotels = useMemo(() => {
    let result = hotelsData.filter((h) =>
      h.city.toLowerCase().includes(search.toLowerCase())
    )

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((h) =>
          h.amenities.includes(key.toUpperCase())
        )
      }
    })

    if (sort === "priceLow") result.sort((a, b) => a.price - b.price)
    if (sort === "priceHigh") result.sort((a, b) => b.price - a.price)
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating)

    return result
  }, [search, filters, sort])

  // -------------------- UI --------------------

  return (
    <div className="hotels-page">
      {/* Header */}
      <header className="hotels-header">
        <h1>Find your perfect stay</h1>
        <p>Search hotels, compare prices, and book instantly</p>
      </header>

      {/* Search */}
      <input
        className="search-box"
        placeholder="Search by city (e.g. Goa, Delhi, Mumbai)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Controls */}
      <div className="controls">
        <div className="filters">
          {["wifi", "pool", "parking", "ac"].map((f) => (
            <label key={f}>
              <input
                type="checkbox"
                checked={(filters as any)[f]}
                onChange={(e) =>
                  setFilters({ ...filters, [f]: e.target.checked })
                }
              />
              {f.toUpperCase()}
            </label>
          ))}
        </div>

        <div className="right-controls">
          <select value={sort} onChange={(e) => setSort(e.target.value as any)}>
            <option value="priceLow">Price ↑</option>
            <option value="priceHigh">Price ↓</option>
            <option value="rating">Rating</option>
          </select>

          <button onClick={() => setView("grid")}>⬜</button>
          <button onClick={() => setView("list")}>☰</button>
        </div>
      </div>

      {/* Hotels */}
      <div className={`hotels-grid ${view}`}>
        {filteredHotels.length === 0 ? (
          <p className="empty">No hotels found</p>
        ) : (
          filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} view={view} />
          ))
        )}
      </div>
    </div>
  )
}
