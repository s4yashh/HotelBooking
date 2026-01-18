import React, { useState } from "react"

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void
}

export interface FilterOptions {
  minPrice: number
  maxPrice: number
  minRating: number
  city: string
  type: "All" | "Hotel" | "Resort" | "Apartment"
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    minPrice: 0,
    maxPrice: 10000,
    minRating: 0,
    city: "",
    type: "All",
  })

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  return (
    <div className="filter-bar">
      <h3>Filters</h3>

      <div className="filter-group">
        <label>
          Price Range: ₹{filters.minPrice} - ₹{filters.maxPrice}
        </label>
        <input
          type="range"
          min="0"
          max="10000"
          value={filters.maxPrice}
          onChange={(e) => handleFilterChange({ maxPrice: parseInt(e.target.value) })}
          className="price-slider"
        />
      </div>

      <div className="filter-group">
        <label>Minimum Rating: {filters.minRating}⭐</label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={filters.minRating}
          onChange={(e) => handleFilterChange({ minRating: parseFloat(e.target.value) })}
          className="rating-slider"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          placeholder="Search city..."
          value={filters.city}
          onChange={(e) => handleFilterChange({ city: e.target.value })}
          className="city-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="type">Property Type</label>
        <select
          id="type"
          value={filters.type}
          onChange={(e) => handleFilterChange({ type: e.target.value as FilterOptions["type"] })}
          className="type-select"
        >
          <option value="All">All Types</option>
          <option value="Hotel">Hotel</option>
          <option value="Resort">Resort</option>
          <option value="Apartment">Apartment</option>
        </select>
      </div>
    </div>
  )
}
