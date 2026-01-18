import React, { useState, useMemo } from "react"
import { HotelCard } from "../components/HotelCard"
import { FilterBar, FilterOptions } from "../components/FilterBar"
import { SkeletonLoader } from "../components/HotelSkeleton"
import { hotels } from "../data/hotels"

const Hotels: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({
    minPrice: 0,
    maxPrice: 10000,
    minRating: 0,
    city: "",
    type: "All",
  })

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const matchesPrice = hotel.price >= filters.minPrice && hotel.price <= filters.maxPrice
      const matchesRating = hotel.rating >= filters.minRating
      const matchesCity =
        filters.city === "" || hotel.city.toLowerCase().includes(filters.city.toLowerCase())
      const matchesType = filters.type === "All" || hotel.type === filters.type

      return matchesPrice && matchesRating && matchesCity && matchesType
    })
  }, [filters])

  return (
    <div className="hotels-page">
      <h1>Find Your Perfect Stay</h1>
      <div className="hotels-container">
        <FilterBar onFilterChange={setFilters} />
        <div className="hotels-grid">
          {loading ? (
            <SkeletonLoader count={6} />
          ) : filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
          ) : (
            <p className="no-results">No hotels match your filters. Try adjusting your criteria.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hotels
